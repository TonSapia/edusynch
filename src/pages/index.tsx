import { Component } from "react";

type HomeProps = {}
type HomeState = {
  name: string;
}

export default class Home extends Component<HomeProps, HomeState> {

  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}
