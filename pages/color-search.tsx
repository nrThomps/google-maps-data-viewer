import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Loading, NextUIProvider, Radio, Spacer } from "@nextui-org/react";
import { Text, Card } from "@nextui-org/react";

const moods = {
  red: "#D2042D",
  yellow: "#f8b800",
  orange: "#FF9525",
  blue: "#54A5D5",
  green: "#678f4f",
  purple: "#800080",
  white: "#ffffff",
};

const Home: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [color, setColor] = useState<string>("red");
  const [loading, setLoading] = useState<boolean>(false);

  const colorSearch = async (color: string) => {
    setLoading(true);
    await fetch(`/api/color-search?color=${color}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    colorSearch(color);
  };

  useEffect(() => {
    colorSearch(color);
  }, []);

  return (
    <NextUIProvider>
      <div className="container">
        <Head>
          <title>LuminoCity - Algorithm Viewer</title>
          <meta
            name="description"
            content="Simple viewer for Google Maps API Data"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.mainAlt}>
          <div style={{ textAlign: "center" }}>
            <Text
              h1
              size={60}
              css={{
                textGradient: "45deg, $green500 20%, $blue500 80%",
                marginTop: 25,
              }}
              weight="bold"
            >
              Algorithm Demo
            </Text>
            <p className="mt-3">
              Choose a color to view locations in the west village
            </p>
          </div>
          <Radio.Group
            row
            value={color}
            onChange={(val) => handleColorChange(val.toString())}
          >
            <Radio value="red" color="error">
              Red
            </Radio>
            <Spacer />
            <Radio value="yellow" color="warning">
              Yellow
            </Radio>
            <Spacer />
            <Radio value="purple" color="secondary">
              Purple
            </Radio>
            <Spacer />
            <Radio value="orange" color="warning">
              Orange
            </Radio>
            <Spacer />
            <Radio value="blue" color="primary">
              Blue
            </Radio>
            <Spacer />
            <Radio value="green" color="success">
              Green
            </Radio>
          </Radio.Group>

          {!loading && (
            <div className="my-3 w-100 text-align-center">
              {data &&
                data.map((v: any, i: number) => (
                  <Card
                    bordered
                    shadow={false}
                    hoverable
                    css={{ margin: 10 }}
                    key={i}
                  >
                    <div className="d-md-flex">
                      <p className="mx-2">{v.name}&nbsp;&nbsp;<strong>{"$".repeat(v.price_level)}</strong></p>
                    </div>
                    <div className="d-md-flex">
                      {v.types.map((v: string, index: number) => (
                        <small className="text-muted mx-1" key={index}>
                          {v}
                        </small>
                      ))}
                    </div>
                  </Card>
                ))}
            </div>
          )}
          {loading && (
            <Loading
              type="default"
              className="my-5"
              css={{ textAlign: "center" }}
              size="lg"
            />
          )}
        </main>
      </div>
    </NextUIProvider>
  );
};

export default Home;
