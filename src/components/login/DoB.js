import { useMediaQuery } from "react-responsive";
export default function DoB(
    {
        birthDay,
        birthMonth,
        birthYear,
        days,
        months,
        years,
        handleRegisterChange,
        dateError,
    }
) {
    const view1 = useMediaQuery({
        query: "(min-width: 539px)",
    });

    const view2 = useMediaQuery({
        query: "(min-width: 850px)",
    });

    const view3 = useMediaQuery({
        query: "(min-width: 1170px)",
    });
    return (
        <div className="register_grid"
            style={{
                marginBottom: `${dateError && !view3 ? "90px" : "0"}`
            }}
        >
            <select
                name="birthDay"
                value={birthDay}
                onChange={handleRegisterChange}
            >
            {days.map((day, i) => (
                <option value={day} key={i}>{day}</option>
            ))}
            </select>

            <select
                name="birthMonth"
                value={birthMonth}
                onChange={handleRegisterChange}
            >
            {months.map((month, i) => (
                <option value={month} key={i}>
                {month}
                </option>
            ))}
            </select>

            <select
                name="birthYear"
                value={birthYear}
                onChange={handleRegisterChange}
            >
            {years.map((year, i) => (
                <option value={year} key={i}>
                {year}
                </option>
            ))}
            </select>

            {dateError && (
                <div className={!view3 ? "input_error" : "input_error_large"}>
                    <div className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}></div>
                    {dateError}
                </div>
            )}
        </div>
    );
}
