import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Download, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Toggle,
} from "@/components/ui/toggle";
import {
  Button,
} from "@/components/ui/button";
import { partyPositions, POSITION_CATEGORIES, type PartyPosition, type PositionCategory } from '@/data/party-positions';
import html2canvas from 'html2canvas';

interface ComparisonInfographicProps {
  selectedParties: string[];
}

// Convert array to object for easier lookup
const PARTY_DATA: { [key: string]: PartyPosition } = partyPositions.reduce((acc, party) => {
  acc[party.name] = party;
  return acc;
}, {} as { [key: string]: PartyPosition });

const ComparisonInfographic: React.FC<ComparisonInfographicProps> = ({ selectedParties }) => {
  const topics = Object.values(POSITION_CATEGORIES);
  const infographicRef = useRef<HTMLDivElement>(null);

  const exportToPng = async () => {
    if (!infographicRef.current) return;

    try {
      const canvas = await html2canvas(infographicRef.current, {
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        logging: false,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `whotovote-comparison-${selectedParties.join('-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <div ref={infographicRef} className="w-full mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">German Political Parties</h2>
          <p className="text-gray-600">Key Policy Positions Comparison</p>
        </div>
        <Button 
          className="flex items-center gap-2 w-full md:w-auto"
          onClick={exportToPng}
        >
          <Download className="h-4 w-4" />
          Save Image
        </Button>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-[640px] md:min-w-0 p-4 md:p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 border text-left whitespace-nowrap">Policy Area</th>
                {selectedParties.map(partyKey => (
                  <th
                    key={partyKey}
                    className="p-3 border text-left whitespace-nowrap"
                    style={{
                      backgroundColor: PARTY_DATA[partyKey].color,
                      color: PARTY_DATA[partyKey].textColor
                    }}
                  >
                    {partyKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topics.map(topic => (
                <tr key={topic} className="hover:bg-gray-50">
                  <td className="p-3 border font-medium bg-gray-100 whitespace-nowrap">
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
                        <div className="pl-3 break-words">
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
      </div>
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Data source: WhoToVote 2025</p>
        <p>Created at whotovote.de</p>
      </div>
    </div>
  );
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const GermanFlag = () => (
  <div className="flex h-6 overflow-hidden rounded">
    <div className="w-4 bg-black"></div>
    <div className="w-4 bg-[#DD0000]"></div>
    <div className="w-4 bg-[#FFCE00]"></div>
  </div>
);

const ElectionCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const electionDate = new Date('2025-02-23T00:00:00');
      const difference = electionDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-1">German Federal Election</div>
      <div className="flex justify-center gap-4">
        <div>
          <span className="font-bold text-xl">{timeLeft.days}</span>
          <span className="text-sm text-gray-600 ml-1">days</span>
        </div>
        <div>
          <span className="font-bold text-xl">{timeLeft.hours}</span>
          <span className="text-sm text-gray-600 ml-1">hrs</span>
        </div>
        <div>
          <span className="font-bold text-xl">{timeLeft.minutes}</span>
          <span className="text-sm text-gray-600 ml-1">min</span>
        </div>
        <div>
          <span className="font-bold text-xl">{timeLeft.seconds}</span>
          <span className="text-sm text-gray-600 ml-1">sec</span>
        </div>
      </div>
    </div>
  );
};

const ChatPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Try different possible chat element selectors
    const chatElement = 
      document.querySelector('#chat-widget') || 
      document.querySelector('.chat-widget') ||
      document.querySelector('[role="complementary"]');
    
    const handleChatClick = () => {
      setIsVisible(false);
    };

    if (chatElement) {
      chatElement.addEventListener('click', handleChatClick);
      return () => chatElement.removeEventListener('click', handleChatClick);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-12 right-24 flex items-center gap-4 z-50 animate-bounce cursor-pointer"
      onClick={() => setIsVisible(false)}
    >
      <div className="relative bg-white p-3 rounded-lg shadow-lg text-sm group transition-transform hover:scale-105">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white p-3 rounded-lg ring-1 ring-gray-200">
          Ask any questions about German politics!
        </div>
      </div>
      <div className="animate-pulse hover:scale-110 transition-transform">
        <ArrowRight className="h-6 w-6 text-blue-500" />
      </div>
    </div>
  );
};

const WhoToVote: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedParties, setSelectedParties] = useState<string[]>(['CDU']);
  const [activeTab, setActiveTab] = useState<PositionCategory>(POSITION_CATEGORIES.MIGRATION);
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

  const filteredParties = Object.entries(PARTY_DATA).filter(([, party]) =>
    party.name.toLowerCase().includes(searchTerm) ||
    Object.values(party.fullPositions).some(positions =>
      positions.some(position => 
        position.description.toLowerCase().includes(searchTerm) ||
        position.title.toLowerCase().includes(searchTerm)
      )
    )
  );

  const topics = Object.values(POSITION_CATEGORIES);

  const resetToMain = () => {
    setSelectedParties(['CDU']);
    setIsCompareMode(false);
    setShowInfographic(false);
    setActiveTab(POSITION_CATEGORIES.MIGRATION);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={resetToMain}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && resetToMain()}
            >
              <GermanFlag />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">WhoToVote</h1>
                <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600">Your Guide to German Political Parties</p>
              </div>
            </div>
            <ElectionCountdown />
            <Toggle
              pressed={isCompareMode}
              onPressedChange={setIsCompareMode}
              className="w-full md:w-auto px-4"
            >
              Compare Mode
            </Toggle>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8">
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
          <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {filteredParties.map(([key, party]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedParties.includes(key) ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => togglePartySelection(key)}
                >
                  <CardHeader className="p-2 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 md:w-6 h-4 md:h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: party.color }}
                        />
                        <CardTitle className="text-xs md:text-sm truncate">{party.name}</CardTitle>
                      </div>
                      <a
                        href={party.manifestoPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-gray-700"
                        title="Download Manifesto"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow w-full">
              <div className="p-2 md:p-4 overflow-x-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedParties.map(partyKey => (
                    <div key={partyKey} className="flex items-center space-x-1 md:space-x-2 bg-gray-100 px-2 py-1 rounded-full">
                      <div
                        className="w-3 md:w-4 h-3 md:h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PARTY_DATA[partyKey].color }}
                      />
                      <span className="text-xs md:text-sm font-medium">{PARTY_DATA[partyKey].name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-4 w-4 flex-shrink-0"
                        onClick={() => removeParty(partyKey)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full md:w-auto mb-4"
                  onClick={() => setShowInfographic(!showInfographic)}
                >
                  {showInfographic ? 'Hide' : 'Show'} Shareable Infographic
                </Button>

                {showInfographic ? (
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[640px] md:min-w-0">
                      <ComparisonInfographic selectedParties={selectedParties} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 sticky top-0 z-10 bg-white pb-4 overflow-x-auto">
                      {topics.map(topic => (
                        <Button
                          key={topic}
                          variant="outline"
                          className={`px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium whitespace-nowrap ${
                            activeTab === topic ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => setActiveTab(topic)}
                        >
                          {topic}
                        </Button>
                      ))}
                    </div>

                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[300px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:p-6">
                          {selectedParties.map(partyKey => (
                            <Card key={partyKey} className="w-full">
                              <CardHeader className="p-3 md:p-6">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: PARTY_DATA[partyKey].color }}
                                  />
                                  <CardTitle className="text-sm truncate">{PARTY_DATA[partyKey].name}</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 md:p-6">
                                {PARTY_DATA[partyKey].fullPositions[activeTab]?.map((position, index) => (
                                  <div key={index} className="mb-4">
                                    <h3 className="font-medium mb-1 text-sm md:text-base">{position.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-700">{position.description}</p>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-1 space-y-4">
              {filteredParties.map(([key, party]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-shadow hover:shadow-lg border-0 ${
                    selectedParties[0] === key ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedParties([key])}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: party.color }}
                        />
                        <CardTitle className="text-lg">{party.name}</CardTitle>
                      </div>
                      <a
                        href={party.manifestoPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-gray-700"
                        title="Download Manifesto"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              {selectedParties[0] && (
                <div className="space-y-6">
                  <Card className="border-0">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: PARTY_DATA[selectedParties[0]].color }}
                        />
                        <CardTitle>{PARTY_DATA[selectedParties[0]].name}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sticky top-0 z-10 bg-white pb-4">
                      {topics.map(topic => (
                        <Button
                          key={topic}
                          variant="outline"
                          className={`px-4 py-3 text-sm font-medium ${
                            activeTab === topic ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => setActiveTab(topic)}
                        >
                          {topic}
                        </Button>
                      ))}
                    </div>

                    <div className="bg-white rounded-lg">
                      <div className="space-y-4 p-6">
                        {PARTY_DATA[selectedParties[0]].fullPositions[activeTab]?.map((position, index) => (
                          <div key={index} className="mb-4">
                            <h3 className="font-medium mb-1">{position.title}</h3>
                            <p className="text-gray-700">{position.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <ChatPrompt />
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} LeanAI Ventures LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhoToVote; 
