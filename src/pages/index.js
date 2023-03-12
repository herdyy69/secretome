/* eslint-disable unused-imports/no-unused-vars */
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Meta } from '@/Layouts/Meta'
import { Main } from '@/components/Templates/Main'
import { AppConfig } from '@/Utils/AppConfig'

import { GrCheckmark } from 'react-icons/gr'
import { BsFillCursorFill } from 'react-icons/bs'
import { BiHide } from 'react-icons/bi'
import { BiShow } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, onValue } from 'firebase/database'

const Index = () => {
  const [dataFromFirebase, setDataFromFirebase] = useState([])
  const [inHint, setInHint] = useState('')
  const [hint, setHint] = useState('')
  const [hidden, setHidden] = useState(true)

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

  useEffect(() => {
    const dbRef = ref(db, 'messages')
    onValue(dbRef, snapshot => {
      const data = snapshot.val()
      const messages = []
      for (let id in data) {
        messages?.push({ id, ...data[id] })
      }
      setDataFromFirebase(messages)
    })
  }, [])

  useEffect(() => {
    const dbRef = ref(db, 'hint')
    onValue(dbRef, snapshot => {
      const data = snapshot.val()
      setHint(data)
    })
  }, [])

  const sortedData = dataFromFirebase?.sort((a, b) => {
    return b.id - a.id
  })

  const notifikasi = () =>
    toast.error('Kode Rahasia Salah!', {
      className: 'text-sm',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} | SecreToMe`}
        description={AppConfig.description}
      />
      <ToastContainer />

      <label
        onClick={() => {
          if (hidden === false) {
            setHidden(true)
          }
        }}
        htmlFor="myHint"
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-white flex justify-center items-center">
        {hidden ? (
          <BiHide className="text-2xl text-black" />
        ) : (
          <BiShow className="text-2xl text-black" />
        )}
      </label>

      <input type="checkbox" id="myHint" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-none bg-black border-t-2 border-white">
          <h3 className="font-bold text-[1rem] mb-2">
            Masukkan
            <span className="text-red-500"> Kode Rahasia </span>
            untuk Melihat Pesan
          </h3>
          <input
            value={inHint}
            onChange={e => setInHint(e.target.value)}
            type="password"
            className="input w-full h-12 rounded-md border-2 bg-white text-black border-white mt-2"
            placeholder="Masukkan Kode Rahasia"
          />
          <div className="modal-action">
            <label htmlFor="myHint" className="btn btn-sm btn-ghost">
              Batal
            </label>
            <button
              onClick={() => {
                if (inHint === hint) {
                  setInHint('')
                  setHidden(false)
                  document.getElementById('myHint').checked = false
                }
                if (inHint !== hint) {
                  notifikasi()
                }
              }}
              className="btn btn-sm btn-primary">
              Lihat
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-lg font-bold text-start mt-2">MY TIMELINE</h1>
      {sortedData?.map((data, index) => (
        <div
          key={index}
          className="w-full min-h-[10vh] mx-auto mt-2 rounded-md border-2 border-white">
          <div className="flex flex-col flex-wrap justify-start items-start h-full p-4 text-white">
            <h1 className="text-[14px] font-bold text-start">
              FROM : {data.whoami}
            </h1>
            <p
              style={{
                wordBreak: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                lineHeight: '1.1rem',
                userSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
              }}
              className={
                hidden
                  ? 'text-sm text-start mt-2 blur-sm'
                  : 'text-sm text-start mt-2'
              }>
              {data.pesan}
            </p>
          </div>
        </div>
      ))}
    </Main>
  )
}

export default Index
