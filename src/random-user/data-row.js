export default function DataRow({ data }) {
  return (
    <tr>
      {Object.keys(data).map((key) =>
        key === "imageUrl" ? (
          <td key={key}>
            <img src={data[key]} alt="Some User"></img>
          </td>
        ) : (
          <td key={key}>{data[key]}</td>
        )
      )}
    </tr>
  );

  // return (
  //   <tr>
  //     <td>
  //       <label style={{ display: "block" }}>{firstName}</label>
  //     </td>
  //     <td>
  //       <img src={imageUrl} alt="Some User"></img>
  //     </td>
  //     <td>{street}</td>
  //     <td>{city}</td>
  //     <td>{postalcode}</td>
  //     <td>{country}</td>
  //     <td>{latitude}</td>
  //     <td>{longitude}</td>
  //   </tr>
  // );
}
