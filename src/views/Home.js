import { useEffect, useState } from 'react'
import Head from 'next/head'
import TableRow from '../components/TableRow'

export default () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const res = await fetch('/api')
      const newData = await res.json()
      setData(newData)
    }
    getData()
  }, [])
  return (
    <main>
      <h1>Logged in</h1>
      {data.length > 0 ? (
        data.map(d => (
          // <TableRow
          //   key={d.data.telephone}
          //   creditCard={d.data.creditCard.number}
          //   firstName={d.data.firstName}
          //   lastName={d.data.lastName}
          //   telephone={d.data.telephone}
          // />
          <div>test</div>
        ))
      ) : (
        <>
          <TableRow loading />
          <TableRow loading />
          <TableRow loading />
        </>
    )}
      </main>
  )
}
