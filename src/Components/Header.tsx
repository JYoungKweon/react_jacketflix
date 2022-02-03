import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 25px 15px 25px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 150px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 5px;
    stroke: ${(props) => props.theme.red};
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 20px;
  }
  margin-bottom: 5px;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -9px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 5px;
  padding-left: 30px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0.7, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
  up: {
    backgroundColor: "rgba(0,0,0,0)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() < 80) {
        navAnimation.start("up");
      } else {
        navAnimation.start("scroll");
      }
    });
  }, [scrollY, navAnimation]);
  const navhistory = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    navhistory(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          fillOpacity={1}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M 47.98 3.75 c 6.72 -0.02 13.44 -0.05 20.16 -0.08 l -0.63 125.6 c -0.08 16.42 -0.87 29.17 -2.36 38.33 c -2 11.97 -5.56 22.06 -10.67 30.39 c -5.11 8.32 -11.82 13.66 -20.11 15.9 c -9.73 2.62 -17.19 -1.02 -22.42 -11.41 c -5.23 -10.36 -7.87 -27.17 -7.92 -50.13 c 6.27 -2.8 12.55 -5.54 18.83 -8.21 c 0.21 11.97 1.02 20.29 2.45 24.92 c 2.14 7.05 5.41 10.02 9.82 9.04 c 4.45 -0.99 7.61 -4.32 9.47 -9.94 c 1.86 -5.63 2.83 -16.64 2.89 -33.09 c 0.17 -43.78 0.33 -87.55 0.49 -131.32 Z M 178.41 179.5 c -7.33 1.21 -14.66 2.48 -21.98 3.8 c -2.79 -13.1 -5.58 -26.31 -8.37 -39.63 c -13.32 1.92 -26.62 3.98 -39.9 6.18 c -2.85 14.79 -5.69 29.71 -8.52 44.78 c -7.1 1.55 -14.19 3.15 -21.27 4.81 A 9568.84 9568.84 0 0 1 118.52 3.48 c 7.13 -0.02 14.26 -0.05 21.39 -0.07 c 12.86 61.04 25.68 119.56 38.5 176.09 Z m -36.56 -65.67 c -4.4 -22.07 -8.81 -44.44 -13.22 -67.14 a 11139.2 11139.2 0 0 0 -14.04 70.46 c 9.08 -1.16 18.16 -2.27 27.26 -3.32 Z M 253.97 107.97 c 6.53 2.94 13.06 5.87 19.6 8.78 c -3.17 18.08 -8.31 31.83 -15.41 41.34 c -7.1 9.5 -16.06 15.01 -26.85 16.45 c -13.35 1.78 -24.24 -4.26 -32.67 -18.82 c -8.43 -14.53 -12.51 -35.8 -12.25 -63.36 c 0.27 -29.15 4.79 -52.06 13.55 -68.16 C 208.7 8.07 220.1 0.29 234.14 0.29 c 12.26 0.01 22.16 6.06 29.72 17.87 c 4.5 6.99 7.84 17 10.01 30.03 c -6.71 2.81 -13.42 5.66 -20.13 8.56 c -1.11 -8.55 -3.53 -15.27 -7.25 -20.18 s -8.27 -7.33 -13.65 -7.21 c -7.43 0.16 -13.5 4.8 -18.22 14.06 c -4.71 9.25 -7.17 24.2 -7.36 44.69 c -0.2 21.74 1.93 37.01 6.41 45.67 c 4.48 8.68 10.37 12.51 17.69 11.69 c 5.39 -0.6 10.06 -3.96 14 -10.02 c 3.95 -6.06 6.82 -15.22 8.61 -27.48 Z M 290.91 165.03 c 0.41 -53.99 0.83 -107.99 1.24 -161.98 l 20.24 -0.03 c -0.16 23.72 -0.33 47.45 -0.49 71.17 c 13.84 -24.21 27.63 -47.87 41.37 -71.22 c 9.07 -0.01 18.14 -0.01 27.21 -0.02 c -12.65 20.32 -25.34 40.81 -38.07 61.65 c 13.13 31.88 26.34 63.35 39.62 94.72 c -8.81 0.29 -17.62 0.66 -26.42 1.11 c -9.15 -24.17 -18.26 -48.47 -27.33 -73.01 c -5.55 9.06 -11.1 18.21 -16.66 27.44 l -0.33 48.43 c -6.8 0.54 -13.59 1.12 -20.38 1.74 Z M 392.59 159.01 c 0.13 -52.02 0.27 -104.04 0.4 -156.06 c 24.77 -0.01 49.55 -0.01 74.32 0 c 0.02 8.79 0.04 17.58 0.05 26.37 c -18.06 -0.07 -36.11 -0.08 -54.17 -0.04 c -0.02 11.5 -0.03 23.01 -0.05 34.51 c 16.84 -0.09 33.68 -0.08 50.51 0.05 c 0.02 8.75 0.03 17.5 0.05 26.25 c -16.86 -0.18 -33.73 -0.2 -50.59 -0.07 l -0.06 42.36 c 18.82 -0.21 37.63 -0.15 56.45 0.21 l 0.06 26.27 c -25.65 -0.59 -51.31 -0.53 -76.97 0.15 Z M 509.66 160.26 c -0.2 -43.56 -0.39 -87.12 -0.59 -130.68 c -9.93 -0.09 -19.86 -0.16 -29.79 -0.21 c -0.02 -8.81 -0.05 -17.61 -0.07 -26.42 c 26.55 0.01 53.1 0.04 79.65 0.07 c 0.06 9.05 0.13 18.1 0.19 27.15 c -9.9 -0.15 -19.81 -0.28 -29.71 -0.39 c 0.24 43.86 0.49 87.73 0.73 131.59 c -6.8 -0.41 -13.6 -0.78 -20.41 -1.11 Z M 573.27 164.61 c -0.4 -53.86 -0.81 -107.71 -1.21 -161.57 c 22.9 0.03 45.81 0.08 68.71 0.13 c 0.09 9.54 0.18 19.07 0.26 28.61 c -16.16 -0.4 -32.33 -0.75 -48.51 -1.05 c 0.11 12.9 0.21 25.8 0.32 38.7 c 13.98 0.6 27.95 1.27 41.92 2.02 c 0.09 9.49 0.17 18.98 0.26 28.46 c -13.97 -1.05 -27.96 -2 -41.95 -2.83 l 0.57 69.47 c -6.79 -0.69 -13.58 -1.33 -20.37 -1.94 Z M 659.59 174.7 L 658 4.61 c 6.75 0.02 13.49 0.05 20.23 0.08 c 0.44 47.89 0.89 95.79 1.33 143.68 c 16.78 2.22 33.52 4.67 50.24 7.34 c 0.09 10.29 0.17 20.57 0.26 30.86 c -23.41 -4.49 -46.91 -8.45 -70.47 -11.87 Z M 743.82 189.28 L 742.35 3.45 c 6.74 0.02 13.49 0.05 20.23 0.07 l 1.35 189.94 c -6.7 -1.43 -13.4 -2.83 -20.11 -4.18 Z M 772.94 195.44 c 11.1 -30.87 22.22 -62.9 33.41 -96.28 a 4080.94 4080.94 0 0 0 -31.47 -95.58 l 23.65 0.09 c 6.81 21.22 13.59 42.94 20.34 65.21 c 6.45 -21.16 12.93 -42.83 19.44 -65.04 c 7.81 0.03 15.63 0.07 23.44 0.11 a 5994.59 5994.59 0 0 1 -30.87 99.76 a 4124.13 4124.13 0 0 1 33.95 115 c -7.97 -2.28 -15.96 -4.49 -23.96 -6.64 c -7.33 -25.96 -14.72 -51.2 -22.15 -75.78 c -7.27 22.13 -14.52 43.67 -21.74 64.67 c -8.01 -1.91 -16.02 -3.75 -24.04 -5.52 Z"></motion.path>
        </Logo>
        <Items>
          <Item>
            <Link to="">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -205 : 0 }}
            transition={{ type: "Linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "Linear" }}
            placeholder="Search for Programs"
          ></Input>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
