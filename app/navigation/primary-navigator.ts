import { createStackNavigator } from "react-navigation-stack"
import { WelcomeScreen, DemoScreen, MainScreen , DetailScreen} from "../screens"

export const PrimaryNavigator = createStackNavigator(
  {
    main: { screen: MainScreen },
    detail: {screen:DetailScreen},
    welcome: { screen: WelcomeScreen },
    demo: { screen: DemoScreen },
  },
  {
    headerMode: "none",
    initialRouteName:"main"
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["main"]
