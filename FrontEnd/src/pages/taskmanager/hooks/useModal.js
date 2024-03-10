import {useState } from 'react'
export default function UseModal() {

    const [modalVisible, setModalVisible] = useState(false)

    function toogleModal(boolean) {
        setModalVisible(boolean)
    }
    return { toogleModal, modalVisible }
}