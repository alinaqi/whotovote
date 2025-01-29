import React, { useState } from 'react';
import { Search, X, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Toggle,
} from "@/components/ui/toggle";
import {
  Button,
} from "@/components/ui/button";

interface PartyData {
  name: string;
  color: string;
  textColor: string;
  positions: {
    [key: string]: string;
  };
  fullPositions: {
    [key: string]: string;
  };
}

interface ComparisonInfographicProps {
  selectedParties: string[];
}

const PARTY_DATA: { [key: string]: PartyData } = {
  CDU: {
    name: "Christian Democratic Union (CDU)",
    color: "#000000",
    textColor: "#FFFFFF",
    positions: {
      "Migration": "Controlled immigration, strict asylum",
      "Islam": "Integration with conditions",
      "Tax": "Corporate & income tax cuts",
      "Energy": "Mixed, including nuclear",
      "Foreign": "Pro-NATO & EU",
      "LGBTQ+": "Supports same-sex marriage"
    },
    fullPositions: {
      "Migration/Immigration": "Advocates for controlled immigration, emphasizing skilled labor; supports stricter asylum policies and efficient deportation processes.",
      "Islam": "Recognizes Islam as part of German society but calls for measures to ensure integration and adherence to constitutional values.",
      "Tax Policy": "Proposes tax cuts, including capping corporate taxes at 25%, abolishing the solidarity levy, and reducing income tax.",
      "Energy Policy": "Supports a balanced energy mix, including renewable energy and a potential return to nuclear power to ensure energy security and affordability.",
      "Foreign Policy": "Strongly supports NATO and the EU; advocates for increased defense spending and a firm stance against Russian aggression.",
      "Sex Education/LGBTQ+": "Supports comprehensive sex education; upholds LGBTQ+ rights, including same-sex marriage."
    }
  },
  SPD: {
    name: "Social Democratic Party (SPD)",
    color: "#E3000F",
    textColor: "#FFFFFF",
    positions: {
      "Migration": "Regulated, humanitarian focus",
      "Islam": "Interfaith dialogue support",
      "Tax": "Relief for low/middle income",
      "Energy": "Phase out nuclear & coal",
      "Foreign": "Diplomatic solutions",
      "LGBTQ+": "Strong rights support"
    },
    fullPositions: {
      "Migration/Immigration": "Supports regulated immigration with a focus on integration; opposes asylum procedures in third countries and emphasizes humanitarian responsibilities.",
      "Islam": "Recognizes Islam as part of German society; promotes interfaith dialogue and anti-discrimination measures.",
      "Tax Policy": "Focuses on tax relief for low and middle-income households; proposes reducing VAT on groceries and increasing taxes on higher incomes and inheritances.",
      "Energy Policy": "Committed to phasing out coal and nuclear energy; invests in renewable energy and infrastructure to achieve climate goals.",
      "Foreign Policy": "Proposes cautious foreign policy; supports diplomatic solutions and balanced relations, including with Russia and China",
      "Sex Education/LGBTQ+": "Advocates for inclusive sex education; strongly supports LGBTQ+ rights and anti-discrimination laws."
    }
  },
  // Add other parties with similar structure...
};

const ComparisonInfographic: React.FC<ComparisonInfographicProps> = ({ selectedParties }) => {
  const topics = ["Migration", "Islam", "Tax", "Energy", "Foreign", "LGBTQ+"];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">German Political Parties</h2>
          <p className="text-gray-600">Key Policy Positions Comparison</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Save Image
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 bg-gray-100 border text-left">Policy Area</th>
              {selectedParties.map(partyKey => (
                <th
                  key={partyKey}
                  className="p-3 border text-left"
                  style={{
                    backgroundColor: PARTY_DATA[partyKey].color,
                    color: PARTY_DATA[partyKey].textColor
                  }}
                >
                  {PARTY_DATA[partyKey].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topics.map(topic => (
              <tr key={topic} className="hover:bg-gray-50">
                <td className="p-3 border font-medium bg-gray-100">
                  {topic}
                </td>
                {selectedParties.map(partyKey => (
                  <td
                    key={`${partyKey}-${topic}`}
                    className="p-3 border"
                  >
                    <div className="relative">
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: PARTY_DATA[partyKey].color }}
                      />
                      <div className="pl-3">
                        {PARTY_DATA[partyKey].positions[topic]}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Data source: WhoToVote 2025</p>
        <p>Created at whotovote.de</p>
      </div>
    </div>
  );
};

const WhoToVote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedParties, setSelectedParties] = useState<string[]>(['CDU']);
  const [activeTab, setActiveTab] = useState('Migration/Immigration');
  const [showInfographic, setShowInfographic] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const togglePartySelection = (partyKey: string) => {
    if (selectedParties.includes(partyKey)) {
      setSelectedParties(selectedParties.filter(key => key !== partyKey));
    } else if (selectedParties.length < 3) {
      setSelectedParties([...selectedParties, partyKey]);
    }
  };

  const removeParty = (partyKey: string) => {
    setSelectedParties(selectedParties.filter(key => key !== partyKey));
  };

  const filteredParties = Object.entries(PARTY_DATA).filter(([_, party]) =>
    party.name.toLowerCase().includes(searchTerm) ||
    Object.values(party.fullPositions).some(position =>
      position.toLowerCase().includes(searchTerm)
    )
  );

  const topics = Object.keys(PARTY_DATA.CDU.fullPositions);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">WhoToVote</h1>
              <p className="mt-2 text-gray-600">Your Guide to German Political Parties</p>
            </div>
            <Toggle
              pressed={isCompareMode}
              onPressedChange={setIsCompareMode}
              className="px-4"
            >
              Compare Mode
            </Toggle>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search parties or policies..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />
        </div>

        {isCompareMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredParties.map(([key, party]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedParties.includes(key) ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => togglePartySelection(key)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: party.color }}
                      />
                      <CardTitle className="text-sm">{party.name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex flex-wrap gap-4 mb-4">
                  {selectedParties.map(partyKey => (
                    <div key={partyKey} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: PARTY_DATA[partyKey].color }}
                      />
                      <span className="text-sm font-medium">{PARTY_DATA[partyKey].name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-4 w-4"
                        onClick={() => removeParty(partyKey)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button 
                  className="mb-4"
                  onClick={() => setShowInfographic(!showInfographic)}
                >
                  {showInfographic ? 'Hide' : 'Show'} Shareable Infographic
                </Button>

                {showInfographic ? (
                  <ComparisonInfographic selectedParties={selectedParties} />
                ) : (
                  <>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {topics.map(topic => (
                          <TabsTrigger key={topic} value={topic} className="text-sm">
                            {topic}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {selectedParties.map(partyKey => (
                        <Card key={partyKey}>
                          <CardHeader>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: PARTY_DATA[partyKey].color }}
                              />
                              <CardTitle className="text-sm">{PARTY_DATA[partyKey].name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">
                              {PARTY_DATA[partyKey].fullPositions[activeTab]}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              {filteredParties.map(([key, party]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedParties[0] === key ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedParties([key])}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: party.color }}
                      />
                      <CardTitle className="text-lg">{party.name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              {selectedParties[0] && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: PARTY_DATA[selectedParties[0]].color }}
                      />
                      <CardTitle>{PARTY_DATA[selectedParties[0]].name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue={topics[0]}>
                      <TabsList className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {topics.map(topic => (
                          <TabsTrigger key={topic} value={topic} className="text-sm">
                            {topic}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {topics.map(topic => (
                        <TabsContent key={topic} value={topic}>
                          <Card>
                            <CardHeader>
                              <CardTitle>{topic}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-700">
                                {PARTY_DATA[selectedParties[0]].fullPositions[topic]}
                              </p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WhoToVote; 