import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="30px"
      height="30px"
      {...props}
    >
      <Path
        fill="#90caf9"
        d="M44.5 38.3L36.2 30c2.3-4.9 1.5-10.9-2.6-15-5.1-5.1-13.5-5.1-18.6 0s-5.1 13.5 0 18.6c4.1 4.1 10.1 4.9 15 2.6l8.3 8.3c1.7 1.7 4.5 1.7 6.2 0 1.7-1.7 1.7-4.5 0-6.2z"
      />
      <Path
        fill="none"
        stroke="#18193f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={3}
        d="M32.4 26.2l8.1 8.1c1.7 1.7 1.7 4.5 0 6.2h0c-1.7 1.7-4.5 1.7-6.2 0L30 36.2M8 25c-1.8-4.7-.8-10.2 3-14 3.8-3.8 9.5-4.8 14.2-2.9"
      />
      <Path
        fill="none"
        stroke="#18193f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={3}
        d="M31.3 13.1c3.4 5.1 2.8 12.1-1.7 16.6-4.9 4.9-12.6 5.1-17.7.8"
      />
    </Svg>
  )
}

export default SearchIcon;
