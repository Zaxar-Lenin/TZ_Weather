import React, {MouseEvent, MouseEventHandler} from 'react';
import s from "./ModelWindow.module.css"
import {useFormik} from "formik";
import {useAppDispatch} from '../../hooks/hooks';
import {createWeatherForTheCity} from "../../store/reducer/reducerWeather";

type ModelWindowAddPropsType = {
    setActive: (n: boolean) => void
    active: boolean
}

export const ModelWindowAdd = ({
                                   setActive,
                                   active,
                               }: ModelWindowAddPropsType) => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: values => {
            dispatch(createWeatherForTheCity(values.name))
            values.name = ""
            setActive(false)
        },
    });

    const modelWindowHandler = () => {
        setActive(false)
    }

    const modelContentHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const modelClearHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        formik.values.name = ""
    }



    let classWindow = active ? (s.active + " " + s.model) : s.model
    let classContent = active ? (s.active + " " + s.model__content) : s.model__content

    return (
        <div className={classWindow} onClick={modelWindowHandler}>
            <div className={classContent} onClick={modelContentHandler}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.title}>Choose a city</div>
                    <div className={s.subtitle}>To find city start typing and pick one form the suggestions</div>
                    <div className={s.textInput}>
                        <input
                            autoFocus
                            style={{
                                width: '100%'
                            }}
                            {...formik.getFieldProps('name')}
                        />
                    </div>
                    <div className={s.buttons}>
                        <div
                            style={{
                                border: "none",
                                backgroundColor: "#fff",
                                textTransform: "uppercase",
                                fontSize: "20px",
                                color: "#b28888",
                                margin: "10px 0 0 20px",
                                cursor: "pointer",
                            }}
                            onClick={modelClearHandler}>Clear
                        </div>
                        <div className = {s.buttons__boxRieght}>
                            <div
                                style={{
                                    border: "none",
                                    backgroundColor: "#fff",
                                    textTransform: "uppercase",
                                    fontSize: "20px",
                                    color: "#a59be8",
                                    margin: "10px 0 0 20px",
                                    cursor: "pointer",
                                }}
                                onClick={modelWindowHandler}>Chanel
                            </div>
                            <div>
                                <button
                                    type={"submit"}
                                    style={{
                                        border: "none",
                                        backgroundColor: "#fff",
                                        textTransform: "uppercase",
                                        fontSize: "20px",
                                        color: "#b28888",
                                        margin: "10px 0 0 20px",
                                        cursor: "pointer",
                                    }}>Add
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
};
