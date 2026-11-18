/* ==========================================================================
   App: the list of pages (routes)
   --------------------------------------------------------------------------
   Each <Route> pairs an address with a page. ":year", ":unitId" etc. are
   placeholders: /lesson/y7-u1-l3 opens LessonPage with lessonId "y7-u1-l3".
   ========================================================================== */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { ProgressProvider } from "./state/ProgressContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import YearPage from "./pages/YearPage.jsx";
import UnitPage from "./pages/UnitPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import KS3Page from "./pages/KS3Page.jsx";
import GCSEPage from "./pages/GCSEPage.jsx";
import RevisionPage from "./pages/RevisionPage.jsx";
import PlannerPage from "./pages/PlannerPage.jsx";
import PracticePage from "./pages/PracticePage.jsx";
import WorksheetsPage from "./pages/WorksheetsPage.jsx";
import { AssessmentRunPage, AssessmentsPage } from "./pages/AssessmentsPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import CurriculumMapPage from "./pages/CurriculumMapPage.jsx";
import TutorPage from "./pages/TutorPage.jsx";
import { AboutPage, ContactPage } from "./pages/InfoPages.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ProgressProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/year/:year" element={<YearPage />} />
            <Route path="/unit/:unitId" element={<UnitPage />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/ks3" element={<KS3Page />} />
            <Route path="/gcse" element={<GCSEPage />} />
            <Route path="/revision/foundation" element={<RevisionPage tier="F" />} />
            <Route path="/revision/higher" element={<RevisionPage tier="H" />} />
            <Route path="/revision/planner" element={<PlannerPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/worksheets" element={<WorksheetsPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/assessments/:assessmentId" element={<AssessmentRunPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/curriculum-map" element={<CurriculumMapPage />} />
            <Route path="/tutor" element={<TutorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ProgressProvider>
    </BrowserRouter>
  );
}
