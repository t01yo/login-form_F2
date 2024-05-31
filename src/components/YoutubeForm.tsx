import React from 'react';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
    username: string,
    email: string,
    channel: string
}

export const YouTubeForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log("bleh!", data);
    }

    renderCount++;

    return (
        <>
        
                    <h1>YouTube Form ({renderCount / 2})</h1>


        
        <div className="form-container">

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", { required: { value: true, message: "Username is required" } })} />
                {errors.username && <p className="error-message">{errors.username.message}</p>}

                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" {...register("email", {
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format"
                    },
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (
                                fieldValue !== "admin@example.com" ||
                                "Enter a different email address"
                            )
                        },
                        notBlackListed: (fieldValue) => {
                            return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                        }
                    }
                })} />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", { required: { value: true, message: "Channel is required" } })} />
                {errors.channel && <p className="error-message">{errors.channel.message}</p>}

                <div className="btn">
                <button type="submit">Submit</button>

                </div>
            </form>

            <DevTool control={control} />
        </div>
        </>
    );
}