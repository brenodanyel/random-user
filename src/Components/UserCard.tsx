import { User } from "../Types/User";

type UserCardProps = {
  user: User;
};

export function UserCard(props: UserCardProps) {
  const { user } = props;

  const fullName = `${user.name.title}. ${user.name.first} ${user.name.last}`;
  const birthday = `${new Date(user.dob.date).toLocaleDateString("pt-BR")} (${
    user.dob.age
  } years old)`;

  const infos = [
    {
      label: "Personal informations:",
      children: [
        { label: "Name", value: fullName },
        { label: "Birthday", value: birthday },
        { label: "Phone", value: user.phone },
        {
          label: "Address",
          value: `${user.location.street.name}, ${user.location.street.number}`,
        },
        { label: "City", value: user.location.city },
        { label: "Country", value: user.location.country },
      ],
    },
    {
      label: "Account informations:",
      children: [
        { label: "Email", value: user.email },
        { label: "Username", value: user.login.username },
        { label: "Password", value: user.login.password },
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-md bg-white p-7 shadow-lg sm:flex-row">
      <div className="avatar">
        <div className="w-36 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <img src={user.picture.large} />
        </div>
      </div>

      <div className="divider divider-vertical sm:divider-horizontal"></div>

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
