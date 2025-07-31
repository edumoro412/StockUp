import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  const user = await supabaseService.getUser();

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
