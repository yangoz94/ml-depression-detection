import { useState } from "react";
import Button from "./components/Button";
import Image from "./components/Image";
import Description from "./components/Description";
import Header from "./components/Header";
import Card from "./components/Card";
import Page from "./components/Page";

/* The app has a super simple interface so there is not even a need
 for components. Still, I broke them down in case I decide to expand 
 the application in the future*/

function App() {
  return (
    <Page>
      <Card>
        <Header />
        <Image src="src/assets/wire.svg"></Image>
        <Description />
        <Button label="Try it out!" />
      </Card>
    </Page>
  );
}

export default App;
