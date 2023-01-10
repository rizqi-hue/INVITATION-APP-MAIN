import { BellIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import {
  ButtonCircle,
  ButtonIcon,
  ButtonPrimary,
  ButtonSecondary,
  HeaderLogo,
  InputSearch,
  Navigation,
} from "../../atoms";
import MenuBar from "../MenuBar";
import AvatarDropdown from "./AvatarDropdown";
export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged relative w-full z-40 ">
      <div className={`nc-MainNav2Logged relative z-10 ${"onTop "}`}>
        <div className="container py-3 relative flex justify-between items-center space-x-4 xl:space-x-8">
          <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
            <HeaderLogo />
            <div className="hidden sm:block flex-grow max-w-xl">
              <div className="container">
                <header className="max-w-2xl mx-auto  flex flex-col ">
                  <form className="relative w-full " method="post">
                    <label
                      htmlFor="search-input"
                      className="text-neutral-500 dark:text-neutral-300">
                      <span className="sr-only">Search all icons</span>
                      <InputSearch
                        className="shadow-lg border-0 dark:border"
                        id="search-input"
                        type="search"
                        placeholder="Cari apa ?"
                        sizeClass="pl-14 py-5 pr-5 md:pl-16"
                        rounded="rounded-full"
                      />
                      <ButtonCircle
                        className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                        type="submit">
                        <i className="las la-arrow-right text-xl"></i>
                      </ButtonCircle>
                      <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 22L20 20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </label>
                  </form>
                </header>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
            <div className="hidden items-center xl:flex space-x-2">
              {/* <Navigation /> */}
              <div className="flex">
                {/* <SwitchDarkMode />
                <NotifyDropdown /> */}
                {/* <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span> */}
              </div>
              <Navigation />
              <div></div>
              <div className="hidden sm:block h-6 border-l border-neutral-300 dark:border-neutral-6000"></div>
              <div></div>
              <ButtonIcon sizeClass="px-2 py-2">
                <BellIcon className="w-7 text-gray-300 hover:text-primary-6000" />
              </ButtonIcon>
              <ButtonIcon sizeClass="px-2 py-2">
                <ShoppingBagIcon className="w-7 text-gray-300 hover:text-primary-6000" />
              </ButtonIcon>
              <AvatarDropdown />
            </div>
            <div className="flex items-center space-x-3 xl:hidden">
              {/* <NotifyDropdown />
              <AvatarDropdown /> */}
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogged;
