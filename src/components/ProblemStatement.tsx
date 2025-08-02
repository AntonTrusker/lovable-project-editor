import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
const ProblemStatement = () => {
  const problems = [{
    title: "Tool Juggling Nightmare",
    quote: "I have 15 browser tabs open just to check my startup's health",
    description: "Constantly switching between Slack, LinkedIn, Airtable, Google Sheets, Calendly, and a dozen other tools. Important messages get buried and connections slip through the cracks.",
    stats: [{
      number: "15+",
      label: "Tools per day"
    }, {
      number: "2.5hrs",
      label: "Time lost switching"
    }, {
      number: "40%",
      label: "Missed opportunities"
    }]
  }, {
    title: "Fundraising Feels Impossible",
    quote: "I've sent 200+ emails and still can't get in front of the right investors",
    description: "Spend months crafting the perfect pitch, only to get generic rejections or complete silence. Don't know which investors actually fund companies like yours.",
    stats: [{
      number: "1.2%",
      label: "Pitch success rate"
    }, {
      number: "8.5",
      label: "Months to raise"
    }, {
      number: "87%",
      label: "Founder stress level"
    }]
  }, {
    title: "Flying Solo When You Shouldn't",
    quote: "I'm making million-dollar decisions with no one to talk to",
    description: "Surrounded by friends and family who mean well, but they just don't get it. Need someone who's been through the trenches and understands the weight of payroll.",
    stats: [{
      number: "73%",
      label: "Feel isolated"
    }, {
      number: "19%",
      label: "Have quality mentors"
    }, {
      number: "84%",
      label: "Make decisions alone"
    }]
  }, {
    title: "Drowning in Data, Starving for Insights",
    quote: "I have all these metrics but no idea what they actually mean",
    description: "Google Analytics, Stripe dashboard, and CRM are full of numbers but you're still guessing. Don't have time to analyze it all properly and turn data into actionable insights.",
    stats: [{
      number: "200+",
      label: "Data points tracked"
    }, {
      number: "12",
      label: "Hours analyzing weekly"
    }, {
      number: "34%",
      label: "Confident in decisions"
    }]
  }];
  return <section id="problem" className="bg-muted/30 py-[8px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Daily Reality of Building a Startup
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            If you're a founder, you know these problems all too well. You're not alone—thousands of brilliant entrepreneurs face the same frustrations every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => <Card key={index} className="h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{problem.title}</h3>
                <blockquote className="text-lg italic text-primary mb-4 border-l-4 border-primary pl-4">
                  "{problem.quote}"
                </blockquote>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {problem.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {problem.stats.map((stat, statIndex) => <div key={statIndex} className="text-center">
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>)}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Global Impact */}
        
      </div>
    </section>;
};
export default ProblemStatement;