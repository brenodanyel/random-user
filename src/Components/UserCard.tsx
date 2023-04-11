import { User } from "../Types/User";

type UserCardProps = {
  user: User;
};

export function UserCard(props: UserCardProps) {
  const { user } = props;

  const fullName = `${user.name.title}. ${user.name.first} ${user.name.last}`;
  const address = `${user.location.street.name}, ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}`;
  const birthday = `${new Date(user.dob.date).toLocaleDateString("pt-BR")} (${
    user.dob.age
  } years old)`;

  const infos = [
    {
      label: "Personal informations:",
      children: [
        { label: "Name", value: fullName },
        { label: "Birthday", value: birthday },
        { label: "Address", value: address },
        { label: "Phone", value: user.phone },
      ],
    },
    {
      label: "Account informations:",
      children: [
        { label: "Username", value: user.login.username },
        { label: "Password", value: user.login.password },
      ],
    },
  ];

  return (
    <div className="flex w-full items-center gap-5">
      <img
        src={user.picture.large}
        alt={fullName}
        className="h-36 w-36 rounded-full border border-slate-200 p-1"
      />
      <div className="divider divider-horizontal"></div>
      <div className="flex w-full flex-col gap-2">
        {infos.map((info) => (
          <div className="w-full" key={info.label}>
            <span className="text-xl text-gray-700">{info.label}</span>
            <div className="flex flex-col">
              {info.children.map((child) => (
                <div
                  className="flex flex-wrap justify-between gap-x-12 text-sm text-gray-400"
                  key={child.label}
                >
                  <span>{child.label}:</span>
                  <span>{child.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
