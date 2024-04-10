import { Modal } from '@shopify/app-bridge-react';
import { Button, Image } from '@shopify/polaris';
import { useState } from 'react';

export default function DeleteModal({ openNow, setOpenNow,deleteCustomer, data}) {

    return (
        <>
            <Modal
                title='Do you want to delete customer permanently ?'
                message={`Where customer name - ${data?.name}`}
                open={openNow}
                size=''
                onClose={() => setOpenNow(false)}
                primaryAction={{content:"Delete",destructive:true,onAction:()=>{
                    deleteCustomer()
                }}}
                 >

            </Modal>
        </>


    );
}
