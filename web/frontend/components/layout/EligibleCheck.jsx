import React, { useEffect } from 'react'
import { CalloutCard, Box } from '@shopify/polaris'
import { useAuthenticatedFetch ,Loading} from '@shopify/app-bridge-react';
import {Outlet} from 'react-router-dom'

export default function EligibleCheck({
    isEligible,
    setEligible,
    checkEligibleLoading,
    setCheckLoading
}) {

    let fetch = useAuthenticatedFetch();

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

    async function updateShopDetails(){
        fetch("/api/shop/update")
        .then(res=>res.json())
        .then(res=>{console.log(res,"----shop")})
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        if (isEligible === true || isEligible === false) {
            setCheckLoading(false)
        }
        if (isEligible === null) {
            setCheckLoading(true)
            eligibility_check();
           
        }
        updateShopDetails();
    }, []);

    return (
        checkEligibleLoading ?
            <Loading />
            :
            <Outlet/>
    )
}

