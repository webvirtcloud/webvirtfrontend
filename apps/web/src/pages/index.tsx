import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/shared/layouts/auth';
import { DefaultLayout } from '@/shared/layouts/default';
import { VirtanceLayout } from '@/widgets/layouts/virtance-layout';
import { lazy, Suspense } from 'react';

const SignIn = lazy(() => import('@/pages/sign-in'));
const SignUp = lazy(() => import('@/pages/sign-up'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));
const CreateVirtance = lazy(() => import('@/pages/virtances/create/create'));
const Virtances = lazy(() => import('@/pages/virtances/virtances'));
const VirtanceOverview = lazy(() => import('@/pages/virtances/virtance/overview'));
const VirtanceResize = lazy(() => import('@/pages/virtances/virtance/resize'));
const VirtanceSettings = lazy(() => import('@/pages/virtances/virtance/settings'));
const Keypairs = lazy(() => import('@/pages/keypairs/keypairs'));
const Settings = lazy(() => import('@/pages/settings'));
const NotFound = lazy(() => import('@/pages/not-found'));

export function Routing() {
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/virtances" />} />
          <Route
            path="/virtances"
            element={
              <Suspense>
                <Virtances />
              </Suspense>
            }
          />
          <Route
            path="/virtances/create"
            element={
              <Suspense>
                <CreateVirtance />
              </Suspense>
            }
          />
          <Route
            path="/keypairs"
            element={
              <Suspense>
                <Keypairs />
              </Suspense>
            }
          />
          <Route path="/virtances/:id" element={<VirtanceLayout />}>
            <Route
              index
              element={
                <Suspense>
                  <VirtanceOverview />
                </Suspense>
              }
            />
            <Route
              path="resize"
              element={
                <Suspense>
                  <VirtanceResize />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense>
                  <VirtanceSettings />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/settings"
            element={
              <Suspense>
                <Settings />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/sign-in"
          element={
            <Suspense>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense>
              <ResetPassword />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}
