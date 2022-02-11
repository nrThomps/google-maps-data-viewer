import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import { FormElement, Input } from '@nextui-org/react'
import { Text, Card, Grid } from '@nextui-org/react'

const Home: NextPage = () => {

  const [data, setData] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>('Upscale')
  const [type, setType] = useState<string>('Bar')

  const nearbySearch = async () => {
    await fetch(`/api/nearby-search?keyword=${keyword}&type=${type}`)
      .then(res => res.json())
      .then(data => {
        setData(data.data.results)
      })
  }

  const handleSearchInput = (ev: React.ChangeEvent<FormElement>) => {
    setKeyword(ev.target.value)
  }

  const handleTypeInput = (ev: React.ChangeEvent<FormElement>) => {
    setType(ev.target.value)
  }

  const handleSearch = (ev: React.KeyboardEvent<FormElement>) => {
    if (ev.key.toLowerCase() == 'enter') {
      nearbySearch()
    }
  }

  const handleColorChange = (ev: React.ChangeEventHandler<HTMLSelectElement>, data: any) => {
    // here is where we are going to write to the database if everything is satisfactory
  }

  useEffect(() => {
    nearbySearch()
  }, [nearbySearch])

  return (
    <>
      <div className='container'>
        <Head>
          <title>LuminoCity - Data Viewer</title>
          <meta name="description" content="Simple viewer for Google Maps API Data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div style={{ textAlign: 'center' }}>
            <Text
              h1
              size={60}
              css={{
                textGradient: '45deg, $blue500 -20%, $pink500 50%',
                marginTop: 25
              }}
              weight="bold"
            >
              Simple Proximity Search
            </Text>
            <p className='mt-3'>Enter a keyword and hit enter to search the Manhattan area</p>
          </div>

          <div>
            <Input clearable bordered labelPlaceholder="Keyword Search" initialValue="Search" value={keyword} onChange={handleSearchInput} onKeyDown={handleSearch} css={{ minWidth: 400, alignSelf: 'center', margin: 30 }} />
            <Input clearable bordered labelPlaceholder="Type" initialValue="Type" value={type} onChange={handleTypeInput} css={{ alignSelf: 'center', margin: 30 }} />
          </div>

          <div className='my-3 w-100'>
            {data && data.map((v: any, i: number) => (
              <Card bordered shadow={false} hoverable css={{ margin: 10 }} key={i}>
                <div className='d-md-flex'>
                  <p className='mx-2'>{v.name}</p>
                  <p className='mx-1'>{'$'.repeat(v.price_level)}</p>
                  <div style={{ marginLeft: 'auto' }}>
                    <select className='form-select' onChange={(ev: any) => handleColorChange(ev, v)}>
                      <option selected>Select Color</option>
                      <option value='purple'>Purple</option>
                      <option value='red'>Red</option>
                      <option value='blue'>Blue</option>
                      <option value='green'>Green</option>
                      <option value='yellow'>Yellow</option>
                      <option value='orange'>Orange</option>
                    </select>
                  </div>
                </div>
                <div className='d-md-flex'>
                  {v.types.map((v: string, index: number) => (
                    <small className='text-muted mx-1' key={index}>{v}</small>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
