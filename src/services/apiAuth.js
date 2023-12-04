import { SUPABASE_URL, supabase } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error);

  console.log(data);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error?.message);
  console.log(data);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  // console.log(session);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error);
  // console.log(data);

  return data?.user;
}

export async function updateUserData({ fullName, password, avatar }) {
  // 1) Update user FullName OR Password
  console.log(fullName);
  let userData;
  if (fullName) userData = { data: { fullName } };
  if (password) userData = { password };

  const { data, error } = await supabase.auth.updateUser(userData);
  console.log(data);

  if (error) throw new Error(error);
  if (!avatar) return data;
  // 2) upload user Profile
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { data: avatarImage, error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  // https://bgaxcvvchdtenjzytnsl.supabase.co/storage/v1/object/public/avatar/cabin-001.jpg?t=2023-11-12T13%3A27%3A02.893Z

  if (storageError) throw new Error(error);
  console.log(avatarImage);

  // 3) Update User Profile data
  const { data: updatedData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${SUPABASE_URL}/storage/v1/object/public/avatar/${fileName}`,
    },
  });

  console.log(updatedData);
  return updatedData;
}
