import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FavouriteIcon(props) {
  return (
    <Svg
      width="35px"
      height="35px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.9 10.6c-.1-.4-.5-.6-.9-.6h-9l-4.1-8.4c-.2-.4-.5-.6-.9-.6s-.7.2-.9.6L11 10H2c-.4 0-.8.2-.9.6-.2.4-.1.8.2 1.1l6.6 7.6L5 29.7c-.1.4 0 .8.3 1s.7.3 1.1.1l9.6-4.6 9.6 4.6c.1.2.2.2.4.2.5 0 1-.4 1-1 0-.2 0-.3-.1-.5l-2.8-10.3 6.6-7.6c.3-.2.4-.7.2-1z"
        fill="#FE9803"
      />
    </Svg>
  )
}

export default FavouriteIcon;
