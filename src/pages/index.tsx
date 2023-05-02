import Header from "@/components/shared/Header";
import { Component } from "react";

type HomeProps = {}
type HomeState = {
  name: string;
}

export default class Home extends Component<HomeProps, HomeState> {

  render() {
    return (
      <>
        <Header />       
        <img src = "assets/images/Group 10.svg" /> 
        <img src = "assets/images/Group 11.svg" /> 
        <img src = "assets/images/Group 12.svg" /> 
      </>      
    )
  }
}
