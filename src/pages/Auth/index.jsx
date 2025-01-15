import { Button, Text, Input, Img } from "../../components";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "antd";
import { loginApi } from "./api/auth";

export default function GlassEffectLoginPageBluePage() {
  const token = localStorage.getItem("access_token");

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = (values) => {
    loginApi(values, navigate);
  };

  useEffect(() => {
    if (pathname === "/" && token) {
      navigate("/dashboard");
    }
    form.resetFields();
  }, [pathname, token, navigate]);

  return (
    <>
      <div className="flex w-full justify-center px-14 lg:py-8 md:p-5 sm:p-4 bg-[#EBECEE]">
        <div className="mx-auto flex w-full max-w-[1366px] h-screen justify-center items-center rounded-[24px]  px-14 shadow-md lg:px-5 lg:py-8 md:p-5 sm:px-5 sm:py-4">
          <div className=" flex w-[32%] h-[60%] flex-col items-center gap-10 rounded-[28px]  p-10 lg:w-full md:w-full sm:p-4">
            <div className="flex items-center gap-4">
              <img src="logo.svg" alt="logo" />
              <span>STANDART MOLIYA</span>
            </div>

            <div className="flex w-[86%] flex-col  gap-3 lg:w-full md:w-full items-center">
              <h1 className="font-normal text-[25px]">Вход</h1>
              <Form
                form={form}
                onFinish={handleSubmit}
                autoComplete="off"
                layout="vertical"
                className="flex flex-col gap-6 self-stretch w-full"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <Text as="p" className="text-[13px] font-normal text-black">
                      Номер телефона
                    </Text>

                    <Form.Item
                      name="phone_number"
                      className="w-full"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input
                        shape="round"
                        type="number"
                        name="Phone number"
                        placeholder={`992 ** *** ****`}
                        className="w-full text-black self-stretch rounded-[5px] border-[0.71px] border-solid border-gray-400 px-4 font-gilroymedium"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <Text as="p" className="text-[13px] font-normal text-black">
                      Пароль
                    </Text>
                    <Form.Item
                      name="password"
                      className="w-full text-black"
                      rules={[{ required: true, message: "Required!" }]}
                    >
                      <Input
                        shape="round"
                        type="password"
                        name="password"
                        placeholder={`Пароль
                          
                          `}
                        suffix={
                          <div className="flex h-[10px] w-[10px] items-center justify-center rounded-bl rounded-br-[5px] rounded-tl rounded-tr-[5px]">
                            <Img
                              src="images/img_clarityeyehideline.svg"
                              alt="Clarity:eye-hide-line"
                              className="my-0.5 h-[10px] w-[10px] rounded-bl rounded-br-[5px] rounded-tl rounded-tr-[5px] object-contain"
                            />
                          </div>
                        }
                        className="gap-4 text-black self-stretch rounded-[5px] border-[0.71px] border-solid border-gray-400 px-4 font-gilroymedium"
                      />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item noStyle>
                  <Button
                    type="submit"
                    // onClick={() => navigate("/dashboard")}
                    shape="round"
                    className="self-stretch rounded-md px-[34px] font-gilroybold sm:px-4"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
