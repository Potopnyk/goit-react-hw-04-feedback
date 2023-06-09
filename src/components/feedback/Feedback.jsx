import { useEffect, useState } from "react";
import FeedbackOptions from "components/feedbackOption/FeedbackOptions";
import Statistics from "../statistics/Statistics";
import Section from "../section/Section";
import Notification from "components/notification/Notification";
import btns from './btn.json'

const Feedback = () => {

    let [good, setGood] = useState(0);
    let [neutral, setNeutral] = useState(0);
    let [bad, setBad] = useState(0);
    let [total, setTotal] = useState(0);
    let [positiveFeedback, setPositiveFeedback] = useState(0);

    const handleLeaveFeedback = (event) => {

        switch (event.target.name) {
            case 'good':
                setGood(state => state + 1);
                break;
            
            case 'neutral':
                setNeutral(state => state + 1);
                break;
            
            case 'bad':
                setBad(state => state + 1);
                break;
            
            default:
                return;
        };
    };

    useEffect(() => {
        setTotal(good + neutral + bad);
        setPositiveFeedback(Math.round(good * 100 / total))
    }, [good, neutral, bad, total]);


    return (
            <div className="feedback">
                
                <Section title=''>
                    <FeedbackOptions
                        onLeaveFeedback={handleLeaveFeedback}
                        options={btns.buttons}
                    />
                </Section>
                
                <Section title="Statistics">
                    {total !== 0
                        ? (
                            <Statistics
                                good={good}
                                neutral={neutral}
                                bad={bad}
                                total={total}
                                positivePercentage={positiveFeedback}
                            />
                        )
                    
                        : (<Notification message="There is no feedback" />)}
                </Section>

            </div>
        )
};

export default Feedback;