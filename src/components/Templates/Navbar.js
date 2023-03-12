/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { FiLogOut, FiArrowRight } from 'react-icons/fi'
import { RxTextAlignJustify, RxCross2 } from 'react-icons/rx'
import { BsSendPlus } from 'react-icons/bs'
import { BsFillSendPlusFill } from 'react-icons/bs'
import { BsFillCursorFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, onValue } from 'firebase/database'

const Navbar = ({}) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC3BYY8WwevaIRT0PDWMi0XuVfZFoOwXjM',
    authDomain: 'secretome-e13af.firebaseapp.com',
    databaseURL:
      'https://secretome-e13af-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'secretome-e13af',
    storageBucket: 'secretome-e13af.appspot.com',
    messagingSenderId: '1078372537272',
    appId: '1:1078372537272:web:b292b2eba6b10db0f3754d',
    measurementId: 'G-7Y7X3WPQ5B',
  }

  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)

  const router = useRouter()
  const [navbar, setNavbar] = useState(false)
  const [modal, setModal] = useState(false)

  const [pesan, setPesan] = useState('')
  const [whoami, setWhoami] = useState('Orang Baik')

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth().toString().padStart(2, '0')
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const tanggal = `${day}/${month}/${year} ${hour}:${minute}:${second}`
  const id = Date.now()
  const notifikasi = () =>
    toast.success('Pesan kamu sudah terkirim.', {
      className: 'text-sm',
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const kirimpesan = e => {
    e.preventDefault()
    const dbRef = ref(db, `messages/${id}`)
    set(dbRef, {
      id: id,
      pesan: pesan,
      whoami: whoami,
      tanggal: tanggal,
    })
    modal ? setModal(false) : setModal(true)
    setPesan('')
    setWhoami('Orang Baik')
    notifikasi()
  }

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', changeBackground)
    }
  }, [])

  const modalForm = () => {
    return (
      <div
        className={
          modal
            ? 'animate__animated animate__bounce animate__fadeInDown animate__faster fixed z-50 bg-black'
            : 'animate__animated animate__bounce animate__fadeOutUpBig fixed z-50 bg-black'
        }>
        <div className="p-3 m-3 rounded-md border-2 border-white">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-sm font-bold text-start mb-1">
              KIRIM PESAN KE HERDY TANPA{' '}
              <span className="text-red-500">DIKETAHUI</span>.
            </h1>
            <textarea
              onChange={e => {
                setPesan(e.target.value)
              }}
              value={pesan}
              className="w-full h-24 p-2 text-black bg-white rounded-md"
              placeholder="Tulis pesanmu disini..."
            />
            <h1 className="text-sm font-bold text-start mt-3">SIAPA KAMU?</h1>
            <div className="flex flex-row justify-start items-center w-full gap-2">
              <button
                onClick={() => {
                  setWhoami('Orang Baik')
                }}
                className={
                  whoami === 'Orang Baik'
                    ? 'btn btn-xs rounded-sm w-32 mt-1 p-1'
                    : 'btn btn-xs opacity-50  rounded-sm w-32 mt-1 p-1'
                }>
                Manusia baik
              </button>
              <button
                onClick={() => {
                  setWhoami('Orang Jahat')
                }}
                className={
                  whoami === 'Orang Jahat'
                    ? 'btn btn-xs rounded-sm w-32 mt-1 p-1 text-red-600'
                    : 'btn btn-xs opacity-50  rounded-sm w-32 mt-1 p-1 text-red-600'
                }>
                Manusia jahat
              </button>
            </div>
            <div className="flex flex-row justify-end items-center w-full mt-2">
              <button
                onClick={e => {
                  kirimpesan(e)
                }}
                disabled={pesan === '' ? true : false}
                className="btn btn-primary mt-1 w-full p-1">
                <FiArrowRight className="text-lg" /> KIRIM
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
        }}
        className={
          navbar
            ? 'navbar bg-zinc-900 border-b-2 transition-all duration-300 rounded-b-md'
            : 'navbar bg-transparent border-b-2 transition-all duration-300'
        }>
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => {
                modal ? setModal(false) : setModal(true)
              }}
              className="btn btn-ghost btn-circle w-full p-1">
              <BsFillCursorFill className="text-lg" /> KIRIM PESAN
            </label>
          </div>
        </div>
        <div className="navbar-end">
          <h1
            style={{
              textShadow: '2px 2px 4px #000000',
            }}
            className="btn btn-ghost normal-case text-xl">
            SecretToME
          </h1>
        </div>
      </div>
      {modal ? modalForm() : null}
    </>
  )
}

export default Navbar
