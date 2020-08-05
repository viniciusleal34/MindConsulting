import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/PerfilUsuario";
import Adm from "./screens/PerfilAdm";
import Listar from "./screens/ListarUsuarios";
import Ativar from "./screens/AtivarUser"
import EditarUsers from "./screens/EditarUser"
import EditarOneUser from "./screens/EditarUsuario"
import User from "./screens/UserProfile"
const MainNavigator = createStackNavigator(
 {
   Login:{
    screen: Login,
  },
  Register:{
    screen:Register
  },
  Home:{
    screen:Home
  },
  Adm:{
    screen:Adm
  },
  Listar:{
    screen:Listar
  },
  Ativar:{
    screen:Ativar
  },
  EditarUsers:{
    screen:EditarUsers
  },
  EditarOneUser:{
    screen: EditarOneUser,
    },
  User:{
      screen: User,
      },
},{
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
    header:null,
      
      headerTintColor: "#ca375e",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#161616"
      }
    }
  }
);

const Routes = createAppContainer(MainNavigator); // For setting Navigation Stack
export default Routes;