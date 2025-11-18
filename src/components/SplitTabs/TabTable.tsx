export default function TabTable() {
    return (
        <>
        <h2>Opening Hours</h2>
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td>10:00 – 18:00</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>10:00 – 18:00</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>10:00 – 18:00</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>10:00 – 20:00</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>10:00 – 18:00</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>12:00 – 16:00</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
            </>
    )
}   