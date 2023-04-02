import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import React from "react";
import Manhwa from "./TabComponents/Manhwa";

const ViewingTab = () => {
  return (
    <Tabs align="center" variant="enclosed">
      <TabList>
        <Tab>Manhwa</Tab>
        <Tab>Korean Drama</Tab>
        <Tab>Movies</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Manhwa />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ViewingTab;
