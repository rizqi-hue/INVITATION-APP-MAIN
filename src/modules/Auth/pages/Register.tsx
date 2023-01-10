import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  ButtonPrimary,
  FloatInput,
  svg_desktop_register,
  svg_facebook,
  svg_google,
  svg_twitter,
} from "../../../components";
import { useAppDispatch, useAppSelector } from "app/hooks";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearState, signUp } from "../services/AuthSlice";
import { XCircleIcon } from "@heroicons/react/24/solid";

export interface PageRegisterProps {
  className?: string;
}

type RegisterForm = {
  name: string;
  username: string;
  password: string;
  confPassword: string;
};

const registerSocials = [
  {
    name: "Lanjutkan dengan Facebook",
    href: "#",
    icon: svg_facebook,
  },
  {
    name: "Lanjutkan dengan Twitter",
    href: "#",
    icon: svg_twitter,
  },
  {
    name: "Lanjutkan dengan Google",
    href: "#",
    icon: svg_google,
  },
];

const Register: FC<PageRegisterProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isFetching, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState({}));
      // redirect
    }

    if (isError) {
      // dispatch(clearState({}))
      console.log(errorMessage);
    }
  }, [isSuccess, isError]);

  const doRegister = (data: RegisterForm) => {
    dispatch(
      signUp({
        name: data.name,
        email: data.username,
        password: data.password,
      })
    );
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Register || Mari bergabung bersama kamu</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32 flex mt-10">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
          <div
            className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"></div>
          <div className="w-full mx-auto px-20 flex-col items-center">
            <div className="flex justify-center lg:justify-start">
              <img alt="" src={svg_desktop_register} className="" />
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-2 md:px-32 lg:px-24">
            <form
              onSubmit={handleSubmit(doRegister)}
              className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-600 font-bold text-2xl">
                Selamat Datang
              </h1>
              <p className="text-sm font-normal text-gray-500 mb-8">
                Mari bergabung bersama kami
              </p>
              <FloatInput
                Icon={UserIcon}
                type="text"
                id="name"
                label="Nama Lengkap"
                {...register("name")}
                isError={errors.name}
                errorMessage={errors.name?.message}
              />
              <div className="mb-2"></div>
              <FloatInput
                Icon={AtSymbolIcon}
                type="email"
                label="Email"
                id="email"
                {...register("username")}
                isError={errors.username}
                errorMessage={errors.username?.message}
              />
              <div className="mb-2"></div>
              <FloatInput
                Icon={KeyIcon}
                type="password"
                id="password"
                label="Kata Sandi"
                {...register("password")}
                isError={errors.password}
                errorMessage={errors.password?.message}
              />
              <div className="mb-2"></div>
              <FloatInput
                Icon={KeyIcon}
                type="password"
                id="confPassword"
                label="Konfirmasi Kata Sandi"
                {...register("confPassword")}
                isError={errors.confPassword}
                errorMessage={errors.confPassword?.message}
              />
              {isError && (
                <>
                  <div className="mb-2"></div>
                  <div
                    className="p-1 text-xs rounded-full bg-red-300 items-center text-gray-800 leading-none lg:rounded-full flex lg:inline-flex"
                    role="alert">
                    <span className="flex mr-3">
                      <XCircleIcon className="w-5 text-red-500" />
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {errorMessage}
                    </span>
                    <svg
                      className="fill-current opacity-75 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg>
                  </div>
                </>
              )}
              <div className="mb-6"></div>
              <ButtonPrimary
                loading={isFetching}
                className="w-full"
                type="submit">
                Continue
              </ButtonPrimary>
              <div className="mb-6"></div>
              <div className="flex justify-between">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Forgot Password ?
                </span>
                <a
                  href="#"
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Don't have an account yet?
                </a>
              </div>
              <div className="mb-6"></div>
              <div className="grid gap-3">
                {registerSocials.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
                    <img
                      className="flex-shrink-0"
                      src={item.icon}
                      alt={item.name}
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </a>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
