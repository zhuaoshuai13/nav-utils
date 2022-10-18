import React from "react";
import { useEffect, useState } from "react";

import hljs from "highlight.js";
import Clipboard from "clipboard";
import "highlight.js/styles/base16/railscasts.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Divider, Tag } from "antd";

import NavFunction from "../function/navFunction";

function Nav() {
  const { userClick } = NavFunction();
  const [mainArray, setMainArray] = useState([]);

  const [specArray, setSpecArray] = useState([]);

  const [copyMainArray, setCopyMainArray] = useState([]);

  const [copySpecArray, setCopySpecArray] = useState([]);

  const [phoneName, setPhoneName] = useState([]);

  const copy = new Clipboard(".copy-btn");
  copy.on("success", (e) => {
    console.log(e);
  });
  copy.on("error", function (e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });

  const onFinish = (values) => {
    const { mainArray, specArray, copyMainArray, copySpecArray, names } = userClick(values);
    setMainArray([...mainArray]);
    setSpecArray([...specArray]);
    setCopyMainArray([...copyMainArray]);
    setCopySpecArray([...copySpecArray]);
    setPhoneName([...names]);
  };

  useEffect(() => {
    document.querySelectorAll(".HTML").forEach((block) => {});
    document.querySelectorAll("#cc").forEach((block) => {
      try {
        hljs.highlightBlock(block);
      } catch (e) {
        console.log(e);
      }
    });
  }, [mainArray, specArray]);

  return (
    <>
      <div className="form">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            product: [{}],
          }}>
          <Form.Item label="Country" name="Country" rules={[{ required: false }]}>
            <Input placeholder="默认为全球站,如果是其他站点,填写英文缩写,例如泰国,输入“th”" />
          </Form.Item>
          <Form.Item label="Overview" name="Overview" rules={[{ required: false }]}>
            <Input placeholder="默认为英语,如果是其他站点,输入相对应的翻译" />
          </Form.Item>
          <Form.Item label="Spec" name="Spec" rules={[{ required: false }]}>
            <Input placeholder="默认为英语,如果是其他站点,输入相对应的翻译" />
          </Form.Item>
          <Divider orientation="left">小提示</Divider>
          <Tag color="error">商品链接可以默认根据商品名称生成 例如 HOT 20 将会转变成hot-20</Tag> <br />
          <br />
          <Tag color="error">如果商品链接是默认的,则不需要输入商品链接</Tag>
          <br />
          <br />
          <Tag color="error">如果商品链接与商品名称不匹配,则根据正确的链接输入,例如 hot-20-nfc</Tag>
          <Form.List name="product">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "first"]}
                      rules={[
                        {
                          required: true,
                          message: "请输入商品名称",
                        },
                      ]}>
                      <Input placeholder="商品名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "last"]}
                      rules={[
                        {
                          required: false,
                          message: "Missing last name",
                        },
                      ]}>
                      <Input placeholder="商品链接" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加商品
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              生成代码
            </Button>
          </Form.Item>
        </Form>
      </div>

      {mainArray.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="title">{phoneName[index]}</div>
            <div className="group">
              <div className="wrap">
                <div className="head">
                  <div className="cir">
                    <div className="circle red"></div>
                    <div className="circle yellow"></div>
                    <div className="circle green"></div>
                  </div>
                  <div className="name">MAIN</div>
                  <button data-clipboard-text={copyMainArray[index]} className="copy-btn" type="button">
                    复制
                  </button>
                </div>
                <div className="code">
                  <div className="container">
                    <pre>
                      <code className="HTML" id="cc" dangerouslySetInnerHTML={{ __html: item }}></code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className="wrap">
                <div className="head">
                  <div className="cir">
                    <div className="circle red"></div>
                    <div className="circle yellow"></div>
                    <div className="circle green"></div>
                  </div>
                  <div className="name">SPEC</div>
                  <button data-clipboard-text={copySpecArray[index]} className="copy-btn" type="button">
                    复制
                  </button>
                </div>
                <div className="code">
                  <div className="container">
                    <pre>
                      <code className="HTML" id="cc" dangerouslySetInnerHTML={{ __html: specArray[index] }}></code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Nav;
