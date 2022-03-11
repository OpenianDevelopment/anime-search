import {
    dark as DarkTheme,
    light as LightTheme,
} from "../assets/ts/Theme.config";

export default function LoadingSpin({ dark }) {
    return (
        <div className="mt-[60%] md:mt-[calc(20%+5rem)] flex justify-evenly items-center">
            <div
                className={
                    (dark
                        ? ` border-[${LightTheme.body}] border-b-transparent `
                        : ` border-[${DarkTheme.body}] border-b-transparent `) +
                    "min-h-[100hv] animate-spin rounded-full h-32 w-32 border-8"
                }
            ></div>
        </div>
    );
}
