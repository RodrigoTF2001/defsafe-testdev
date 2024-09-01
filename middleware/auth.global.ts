export default defineNuxtRouteMiddleware(async (to, from) => {
  const supaAuth = useSupabaseClient();
  const config = useRuntimeConfig();

  const { data: user, error: userError } = await supaAuth.auth.getUser();
  const userEmail = user.user?.email;
  const adminEmail = config.public.admin_email 

  if (userEmail) {
    if (userEmail !== adminEmail && to.path.startsWith("/admin-panel")) {
      return navigateTo("/not-allowed");
    }
  }
});
