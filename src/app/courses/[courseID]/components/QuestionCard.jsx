"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const QuestionCard = (question) => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const [bg1, setbg1] = useState('bg-off-white');
    const [bg2, setbg2] = useState('bg-off-white');
    const [bg3, setbg3] = useState('bg-off-white');
    const [bg4, setbg4] = useState('bg-off-white');
    const [explanation1, setExplanation1] = useState(false);
    const [explanation2, setExplanation2] = useState(false);
    const [explanation3, setExplanation3] = useState(false);
    const [explanation4, setExplanation4] = useState(false);

    const resetBackgrounds = () => {
        setbg1('bg-off-white')
        setbg2('bg-off-white')
        setbg3('bg-off-white')
        setbg4('bg-off-white')
        setExplanation1(false)
        setExplanation2(false)
        setExplanation3(false)
        setExplanation4(false)
    }

    const check = (e) => {
        let answer = String(question.answer)

        let userSelection;
        if (document.getElementById(question.options[0]).checked) {
            userSelection = document.getElementById('choice1')
        }
        else if (document.getElementById(question.options[1]).checked) {
            userSelection = document.getElementById('choice2')
        }
        else if (document.getElementById(question.options[2]).checked) {
            userSelection = document.getElementById('choice3')
        }
        else if (document.getElementById(question.options[3]).checked) {
            userSelection = document.getElementById('choice4')
        }

        if (answer.includes("A)")) {
            if (document.getElementById(question.options[0]).checked) {
                setbg1('bg-pastel-green')
                setExplanation1(true)
            }
            else {
                if (document.getElementById(question.options[1]).checked) {
                    setbg2('bg-pastel-red')
                }
                else if (document.getElementById(question.options[2]).checked) {
                    setbg3('bg-pastel-red')
                }
                else if (document.getElementById(question.options[3]).checked) {
                    setbg4('bg-pastel-red')
                }
            }
        }
        else if (answer.includes("B)")) {
            if (document.getElementById(question.options[1]).checked) {
                setbg2('bg-pastel-green');
                setExplanation2(true)
            }
            else {
                if (document.getElementById(question.options[0]).checked) {
                    setbg1('bg-pastel-red')
                }
                else if (document.getElementById(question.options[2]).checked) {
                    setbg3('bg-pastel-red')
                }
                else if (document.getElementById(question.options[3]).checked) {
                    setbg4('bg-pastel-red')
                }
            }
        }
        if (answer.includes("C)")) {
            if (document.getElementById(question.options[2]).checked) {
                setbg3('bg-pastel-green');
                setExplanation3(true)
            }
            else {
                if (document.getElementById(question.options[0]).checked) {
                    setbg1('bg-pastel-red')
                }
                else if (document.getElementById(question.options[1]).checked) {
                    setbg2('bg-pastel-red')
                }
                else if (document.getElementById(question.options[3]).checked) {
                    setbg4('bg-pastel-red')
                }
            }
        }
        if (answer.includes("D)")) {
            if (document.getElementById(question.options[3]).checked) {
                setbg4('bg-pastel-green');
                setExplanation4(true)
            }
            else {
                if (document.getElementById(question.options[0]).checked) {
                    setbg1('bg-pastel-red')
                }
                else if (document.getElementById(question.options[1]).checked) {
                    setbg2('bg-pastel-red')
                }
                else if (document.getElementById(question.options[2]).checked) {
                    setbg3('bg-pastel-red')
                }
        }
    }
    }


    return(
        <>
        <div className="questionCard ml-6 mr-6 mb-4">
            <div className='font-biscuitReg h-fit w-full bg-storm p-4 mt-4 rounded-3xl'>
                <h1 className="flex font-semibold text-dark-gray text-xl mb-2">{question.question}</h1>
                <div className="answerChoices text-dark-gray">
                    <div id="choice1" className= {`choice1 h-fit w-full ${bg1} rounded-3xl p-2 items-center flex mb-2`}>
                        <input onClick={resetBackgrounds} id={question.options[0]} type="radio" value="" name={question.answer} className="w-6 h-6 text-dark-pink bg-gray-100 border-gray-300 focus:ring-light-pink dark:focus:ring-light-pink dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label className="ml-1">{question.options[0]}</label>
                    </div>
                    {explanation1 &&
                            <p className='font-biscuitReg text-darker-gray'>{question.explanation}</p>
                        }
                    <div id="choice2" className={`choice2 h-fit w-full ${bg2} rounded-3xl p-2 items-center flex mb-2`}>
                        <input onClick={resetBackgrounds} id={question.options[1]} type="radio" value="" name={question.answer} className="w-6 h-6 text-dark-pink bg-gray-100 border-gray-300 focus:ring-light-pink dark:focus:ring-light-pink dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label className="ml-2">{question.options[1]}</label>
                    </div>
                    {explanation2 &&
                            <p className='font-biscuitReg text-darker-gray'>{question.explanation}</p>
                        }
                    <div id="choice3" className={`choice3 h-fit w-full ${bg3} rounded-3xl p-2 items-center flex mb-2`}>
                        <input onClick={resetBackgrounds} id={question.options[2]} type="radio" value="" name={question.answer} className="w-6 h-6 text-dark-pink bg-gray-100 border-gray-300 focus:ring-light-pink dark:focus:ring-light-pink dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label className="ml-3">{question.options[2]}</label>
                    </div>
                    {explanation3 &&
                            <p className='font-biscuitReg text-darker-gray'>{question.explanation}</p>
                    }
                    <div id="choice4" className={`choice4 h-fit w-full ${bg4} rounded-3xl p-2 items-center flex mb-2`}>
                        <input onClick={resetBackgrounds} id={question.options[3]} type="radio" value="" name={question.answer} className="w-6 h-6 text-dark-pink bg-gray-100 border-gray-300 focus:ring-light-pink dark:focus:ring-light-pink dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label className="ml-4">{question.options[3]}</label>
                    </div>
                    {explanation4 &&
                            <p className='font-biscuitReg text-darker-gray'>{`${question.explanation}`}</p>
                        }
                    <div className="flex raabsolute right-8 mt-3">
                        <div onClick={check} className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center right-0 hover:cursor-pointer hover:scale-105">
                            <h1 className="text-md text-dark-blue">Check</h1>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default QuestionCard;

