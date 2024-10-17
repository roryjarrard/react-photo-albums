const UsersListItem = ({ user }) => {
    return (
        <div className="border rounded p-4 mb-2">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
    );
};

export default UsersListItem;