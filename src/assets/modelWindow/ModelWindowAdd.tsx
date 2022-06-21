import React, {MouseEvent} from 'react';
import s from "./ModelWindow.module.css"
import {useFormik} from "formik";
import {useAppDispatch} from '../../hooks/hooks';
import {getWeatherForTheCity} from "../../store/reducer/reducerWeather";

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
            dispatch(getWeatherForTheCity(values.name))
            setActive(false)
        },
    });

    const modelWindowHandler = () => {
        setActive(false)
    }

    const modelContenHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    let classWindow = active ? (s.active + " " + s.model) : s.model
    let classContent = active ? (s.active + " " + s.model__content) : s.model__content

    return (
        <div className={classWindow} onClick={modelWindowHandler}>
            <div className={classContent} onClick={modelContenHandler}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.title}>Add new card</div>
                    <div className={s.textInput}>
                        <input
                            style={{
                                width: '100%'
                            }}
                            {...formik.getFieldProps('name')}
                        />
                    </div>
                    <div className={s.buttons}>
                        <button
                            style={{
                                borderRadius: '15px',
                                width: '120px',
                                height: '35px',
                                backgroundColor: "gray",
                                textTransform: 'initial',
                                fontSize: '14px'
                            }}
                            onClick={modelWindowHandler}>Chanel</button>
                        <button
                            type={"submit"}
                            style={{
                                borderRadius: '15px',
                                width: '120px',
                                height: '35px',
                                textTransform: 'initial',
                                fontSize: '14px'
                            }}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
};
