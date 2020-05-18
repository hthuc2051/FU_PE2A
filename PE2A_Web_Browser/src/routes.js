import { LoginPage, AdminPage, LecturerPage, NotFoundPage, ListScriptsPage,
     CreateScriptPage,ListPracticalExamsPage,UpdateScripPage,
      DuplicatedCodePage ,GithubResultPage,OnlineResultPage} from './pages/index';
//import DuplicatedCodeResultPage from '';


const routes = [
    {
        path: '/',
        exact: true,
        main: LoginPage
    },
    // Head lecturer,
    {
        path: '/subjects/:subjectId/scripts',
        exact: true,
        main: ListScriptsPage
    },
    {
        path: '/subjects/:subjectId/scripts/create',
        exact: false,
        main: CreateScriptPage
    },
    {
        path: '/subjects/:subjectId/scripts/:scriptId',
        exact: false,
        main: UpdateScripPage
    },
    {
        path: '/subjects/:subjectId/practical-exams',
        exact: true,
        main: ListPracticalExamsPage
    },
    {
        path: '/subjects/:subjectId/practical-exams/create',
        exact: false,
        main: ListPracticalExamsPage
    },
    // Lecturer
    {
        path: '/lecturers/:id',
        exact: true,
        main: LecturerPage
    },
    {
        path: '/subjects/:id/:subjectName',
        exact: true,
        main: LecturerPage
    },
    {
        path: '/lecturer/:id/invigilate-request',
        exact: false,
        main: LecturerPage
    },
    {
        path: '/admin/action',
        exact: true,
        main: AdminPage
    },
    {
        path: '/not-found',
        exact: false,
        main: NotFoundPage,
    },
    {
        path: '/practicalexam/:practicalExamCode/:studentCode',
        exact: false,
        main: DuplicatedCodePage
    },
    {
        path: '/githubResult/:practicalExamCode/:studentCode',
        exact: true,
        main: GithubResultPage
    },
    {
        path: '/practical-exam/online-result/:practicalExamId',
        exact: true,
        main: OnlineResultPage
    },

    // {
    //     path: '/test',
    //     exact: true,
    //     main: DuplicatedCodeResultPage,
    // },


];

export default routes;