"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
    value: number;
    renderLabel?: (progress: number) => number | string;
    size?: number;
    strokeWidth?: number;
    circleStrokeWidth?: number;
    progressStrokeWidth?: number;
    shape?: "square" | "round";
    className?: string;
    progressClassName?: string;
    labelClassName?: string;
    showLabel?: boolean;
    color: string;
}

const CircularProgress = ({
    value,
    renderLabel,
    className,
    progressClassName,
    labelClassName,
    showLabel,
    shape = "round",
    size = 100,
    strokeWidth,
    circleStrokeWidth = 10,
    progressStrokeWidth = 10,
    color,
}: CircularProgressProps) => {
    const radius = size / 2 - 10;
    const circumference = Math.ceil(Math.PI * radius * 2);
    const percentage = Math.ceil(circumference * ((100 - value) / 100));
    const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${size * 1.25}`;

    return (
        <div className="relative">
            <svg
                width={size}
                height={size}
                viewBox={viewBox}
                version="1.1"
                style={{ transform: "rotate(-90deg)" }}
                className="relative"
            >
                <defs>
                    <filter id="white-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow
                            dx="0"
                            dy="2"
                            stdDeviation="2"
                            floodColor="white"
                            floodOpacity="1"
                        />
                    </filter>
                </defs>

                <circle
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    fill="transparent"
                    strokeWidth={strokeWidth ?? circleStrokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset="0"
                    filter="url(#white-shadow)"
                    className={cn("stroke-[#d5dbe0af]", className)}
                />

                <circle
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeWidth={strokeWidth ?? progressStrokeWidth}
                    strokeLinecap={shape}
                    strokeDashoffset={percentage}
                    fill="transparent"
                    strokeDasharray={circumference}
                    className={cn(color, progressClassName)}
                />
            </svg>

            {showLabel && (
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center text-md",
                        labelClassName
                    )}
                >
                    {renderLabel ? renderLabel(value) : value}
                </div>
            )}
        </div>
    );
};

export const CircularProgressWithLabelDemo: React.FC<{ value: number; color: string }> = ({
    value,
    color,
}) => {
    const progress = [value ?? 0];

    return (
        <div className="max-w-xs mx-auto w-full flex flex-col items-center">
            <CircularProgress
                value={progress[0]}
                size={90}
                strokeWidth={12}
                showLabel
                labelClassName="text-xl font-bold"
                color={color}
            />
        </div>
    );
};
