import React, { useEffect, useState } from 'react'
import { CalloutCard, Box } from '@shopify/polaris'
import { useAuthenticatedFetch, Loading, useNavigate } from '@shopify/app-bridge-react';
import { Outlet, useLocation } from 'react-router-dom'

export default function EligibleCheck({
    isEligible,
    setEligible,
    checkEligibleLoading,
    setCheckLoading,
    setlanguage,
    language,
    setTutorial,
    loading,
    setloading,
    tutorial
}) {

    const [activeplan, setActivePlan] = useState(null)
    let fetch = useAuthenticatedFetch();
    const location = useLocation();
    const navigate = useNavigate();

    async function eligibility_check() {
        fetch("/api/payment/eligibility_check")
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    setEligible(res.result.eligibleForSubscriptions);
                    setCheckLoading(false)
                } else {
                    setEligible(false);
                    setCheckLoading(false)
                }
                console.log(res, "--------graph")
            })
            .catch(err => {
                setEligible(false);
                setCheckLoading(false)
                console.log(err, "errror")
            })
    };
    // console.log(language)

    async function getShopData() {
        setloading(true)
        fetch("/api/shop/details")
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    setlanguage(res.result[0].language);
                    setTutorial(res.result[0].tutorial);
                    setActivePlan(res.result[0].currentPlan)
                    setloading(false);

                }
            })
            .catch(err => {
                setlanguage(null)
                setTutorial(0);
                console.log(err, "error");
                setloading(false)

            })
    }

    async function updateShopDetails() {
        fetch("/api/shop/update")
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }



    useEffect(() => {
        if (isEligible === true || isEligible === false) {
            setCheckLoading(false);
            updateShopDetails();
        }
        if (isEligible === null) {
            setCheckLoading(true)
            eligibility_check();
        }

        if (language !== true) {
            getShopData()

        }
    }, []);


    useEffect(() => {

        if (tutorial === 1 && location.pathname !== "/plan") {
            if (activeplan === 'free') {
                navigate("/plan")
            }
        }
    }, [location])

    return (
        checkEligibleLoading ?
            <Loading />
            :
            loading ?
                <Loading />
                :
                <Outlet />
    )
}

