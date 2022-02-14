

function getColumns(){
    const columns = [
        {
          label: "Profile ID",
          path: "profile_id",
          sorting: true,
          content: (profile, detail) => <td>{profile[detail]}</td>,
        },
        {
            label: "First Name",
            path: "first_name",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
          },
          {
            label: "Last Name",
            path: "last_name",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
          },
          {
            label: "Email",
            path: "email",
            sorting: true,
            content: (profile, detail) => <td>{profile[detail]}</td>,
          },
          {
            label: "Phone No.",
            path: "phone",
            content: (profile, detail) => <td>{profile[detail]}</td>,
          },
          {
            label: "Actions",
            content: (profile, detail) => (
                <td>
                    <button type="button" class="btn btn-outline-secondary" style={{marginRight: '10px'}}>UPDATE</button>
                    <button type="button" class="btn btn-outline-danger">DELETE</button>
                </td>
            ),
          }
    ]
    return columns;
}

export default getColumns;