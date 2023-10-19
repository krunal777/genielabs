import React, { useState } from "react";

import TabNavItem from "../TabComponent/TabNavItem";
import TabContent from "../TabComponent/TabContent";
import MultiStepForm from "../MultiStepForm/MultiStepForm";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem
          title="Avatar clothing"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Weapons"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Environment"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>

      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          {/* <ChooseCharecter /> */}
          <MultiStepForm />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <div className="screen">
            <p>Weapons Tab content</p>
          </div>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <div className="screen">
            <p>Environment Tab content</p>
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
