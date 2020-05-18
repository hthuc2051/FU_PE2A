package com.fpt.automatedtesting.scripts;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.automatedtesting.common.*;
import com.fpt.automatedtesting.actions.dtos.CodeDto;
import com.fpt.automatedtesting.headlecturers.HeadLecturer;
import com.fpt.automatedtesting.scripts.dtos.ConnectionObj;
import com.fpt.automatedtesting.scripts.dtos.ScriptRequestDto;
import com.fpt.automatedtesting.scripts.dtos.ScriptResponseDto;
import com.fpt.automatedtesting.subjects.Subject;
import com.fpt.automatedtesting.exception.CustomException;
import com.fpt.automatedtesting.headlecturers.HeadLecturerRepository;
import com.fpt.automatedtesting.subjects.SubjectRepository;
import com.fpt.automatedtesting.common.CustomUtils;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

import static com.fpt.automatedtesting.common.PathConstants.PATH_DB_TEMPLATE;
import static com.fpt.automatedtesting.common.PathConstants.PATH_DB_TOOLS;

@Service
public class ScriptServiceImpl implements ScriptService {

    private static final String PREFIX_START = "//start";
    private static final String PREFIX_END = "//end";
    private static final String EXTENSION_JAVA = ".java";
    private static final String EXTENSION_C = ".c";
    private static final String EXTENSION_CSharp = ".cs";
    private static final String QUESTION_POINT_STR_VALUE = "questionPointStrValue";
    private static final String CONNECTION_C = "\"CONNECTION HERE\"";
    private static final String CONNECTION_C_FORMAT = "(NULL == CU_add_test(pSuite, \"$variable\", $variable))";
    private static final String GLOBAL_VARIABLE_STR = "//GLOBAL_VARIABLE";
    private static final String STATIC_STR = "static ";

    private final ScriptRepository scriptRepository;
    private final HeadLecturerRepository headLecturerRepository;
    private final SubjectRepository subjectRepository;
    private Gson gson = new Gson();

    @Autowired
    public ScriptServiceImpl(ScriptRepository scriptRepository, HeadLecturerRepository headLecturerRepository, SubjectRepository subjectRepository) {
        this.scriptRepository = scriptRepository;
        this.headLecturerRepository = headLecturerRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<ScriptResponseDto> getAll() {
        List<ScriptResponseDto> result = MapperManager.mapAll(scriptRepository.findAllByActiveIsTrue(), ScriptResponseDto.class);
        return result;
    }

    @Override
    public List<ScriptResponseDto> getScriptTestBySubjectId(Integer subjectId) {
        List<Script> listScript = scriptRepository.getAllBySubjectIdAndActiveIsTrueOrderByTimeCreatedDesc(subjectId);
        List<ScriptResponseDto> result = new ArrayList<>();
        for (Script item : listScript) {
            String docPath = item.getDocumentPath();
            String fileName = "";
            try {
                File file = new File(docPath);
                if (file != null) {
                    fileName = file.getName();
                }
            } catch (Exception e) {

            }
            ScriptResponseDto dto = MapperManager.map(item, ScriptResponseDto.class);
            dto.setDocFileName(fileName);
            result.add(dto);
        }
        return result;
    }

    @Override
    public String generateScriptTest(ScriptRequestDto dto) {

        HeadLecturer headLecturer = headLecturerRepository.findById(dto.getHeadLecturerId())
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Not found user with id" + dto.getHeadLecturerId()));
        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Not found subject with id" + dto.getSubjectId()));

        try {
            if (dto == null) throw new CustomException(HttpStatus.NOT_FOUND, CustomMessages.MSG_SCRIPT_NULL);
            String templatePath = "";
            String scriptStorePath = "";
            String scriptStoreOnlinePath = "";
            String fileExtension = "";
            String docsFolPath = "";
            String templateQuestionFolPath = "";
            String databaseFolPath = "";
            String testDataFolPath = "";
            boolean isTemplateC = false;
            boolean isAddStatic = false;
            // Select path to create and save script test by type
            switch (subject.getCode()) {
                case CustomConstant.TEMPLATE_TYPE_JAVA:
                    templatePath = PathConstants.PATH_TEMPLATE_JAVA;
                    scriptStorePath = PathConstants.PATH_SCRIPT_JAVA;
                    docsFolPath = PathConstants.PATH_DOCS_JAVA;
                    fileExtension = EXTENSION_JAVA;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_JAVA;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_JAVA;
                    testDataFolPath = PathConstants.PATH_TESTDATA_JAVA;
                    scriptStoreOnlinePath = PathConstants.PATH_SCRIPT_JAVA_ONLINE;
                    isAddStatic = true;
                    break;
                case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                    templatePath = PathConstants.PATH_TEMPLATE_JAVA_WEB;
                    scriptStorePath = PathConstants.PATH_SCRIPT_JAVA_WEB;
                    docsFolPath = PathConstants.PATH_DOCS_JAVA_WEB;
                    fileExtension = EXTENSION_JAVA;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_JAVA_WEB;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_JAVA_WEB;
                    testDataFolPath = PathConstants.PATH_TESTDATA_JAVA_WEB;
                    isAddStatic = true;
                    break;
                case CustomConstant.TEMPLATE_TYPE_CSHARP:
                    templatePath = PathConstants.PATH_TEMPLATE_CSHARP;
                    scriptStorePath = PathConstants.PATH_SCRIPT_CSHARP;
                    docsFolPath = PathConstants.PATH_DOCS_CSHARP;
                    fileExtension = EXTENSION_CSharp;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_C_SHARP;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_C_SHARP;
                    testDataFolPath = PathConstants.PATH_TESTDATA_C_SHARP;
                    break;
                case CustomConstant.TEMPLATE_TYPE_C:
                    templatePath = PathConstants.PATH_TEMPLATE_C;
                    scriptStorePath = PathConstants.PATH_SCRIPT_C;
                    docsFolPath = PathConstants.PATH_DOCS_C;
                    fileExtension = EXTENSION_C;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_C;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_C;
                    testDataFolPath = PathConstants.PATH_TESTDATA_C;
                    isTemplateC = true;
                    break;
                default:
                    throw new CustomException(HttpStatus.CONFLICT, "TypeConflictNotSupported");
            }

            // Get template path
            Resource resource = new ClassPathResource(templatePath);
            if (resource == null) throw new CustomException(HttpStatus.NOT_FOUND, "TemplateNotFound");
            InputStream inputStream = resource.getInputStream();
            byte[] bData = FileCopyUtils.copyToByteArray(inputStream);
            String data = new String(bData, StandardCharsets.UTF_8);

            ObjectMapper mapper = new ObjectMapper();
            // [{"testcase":"testcase1", "code":"ABC"}, {"testcase":"testcase2", "code":"AB2C"}]
            String middlePart = "";
            if (dto.getQuestions() != null && !dto.getQuestions().equals("")) {
                List<CodeDto> codeDtoList = Arrays.asList(mapper.readValue(dto.getQuestions(), CodeDto[].class));
                if (codeDtoList != null && codeDtoList.size() > 0) {
                    for (CodeDto code : codeDtoList) {
                        middlePart += code.getCode().replace(QUESTION_POINT_STR_VALUE, "\"");
                    }
                }
            }

            int startIndex = data.indexOf(PREFIX_START);
            String startPart = data.substring(0, startIndex) + PREFIX_START;
            int endIndex = data.indexOf(PREFIX_END);

            String endPart = data.substring(endIndex, data.length());
            String tempScript = startPart + "\n" + middlePart + "\n" + endPart;
            String fullScript = tempScript.replace(QUESTION_POINT_STR_VALUE, dto.getQuestionPointStr());
            if(isAddStatic && !"".equals(dto.getGlobalVariable())){
                String[] variables = dto.getGlobalVariable().split(";");
                String newVariabes = "";
                for (String item: variables) {
                    if(item != null && !"".equals(item)){
                        newVariabes += STATIC_STR + item +";"+ "\n";
                    }
                }
                fullScript = fullScript.replace(GLOBAL_VARIABLE_STR, newVariabes);
            }else {
                fullScript = fullScript.replace(GLOBAL_VARIABLE_STR, dto.getGlobalVariable());
            }
            // generate connect for C_Template
            if (isTemplateC) {
                String connection = "";
                String[] questionStrs = dto.getQuestionPointStr().split("-");
                for (String question : questionStrs) {
                    String[] temp = question.split(":");
                    String questionName = temp[0];
                    String connect_C = CONNECTION_C_FORMAT.replace("$variable", questionName);
                    if ("".equals(connection)) {
                        connection += connect_C;
                    } else {
                        connection += " || " + connect_C;
                    }
                }
                fullScript = fullScript.replace(CONNECTION_C, connection);
            }
            // Write new file to Scripts_[Language] folder
            Date date = new Date();
            Integer hashCode = CustomUtils.getCurDateTime(date, "Date").hashCode();
            String code = subject.getCode() + "_" + Math.abs(hashCode);
            String scriptPath = scriptStorePath + code + fileExtension;
            BufferedWriter writer = new BufferedWriter(
                    new FileWriter(scriptPath,
                            false));
            writer.write(fullScript);
            writer.close();
            inputStream.close();

            // Copy docs file to Docs_[Language] folder
            String documentPath = "";
            String documentExtesion = CustomConstant.EXTENSION_DOCUMENT;
            MultipartFile docsFile = dto.getDocsFile();
            if (docsFile != null) {
                documentPath = docsFolPath + code + documentExtesion;
                Path copyLocation = Paths.get(documentPath);
                Files.copy(docsFile.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            // Save CONNECTION STRING AND FILES in saveFiles()
            saveFilesAndConnectionString(dto, templateQuestionFolPath, databaseFolPath, testDataFolPath, code, fileExtension);
            // Save to database
            Script script = new Script();
            script.setName(dto.getName());
            script.setHeadLecturer(headLecturer);
            script.setSubject(subject);
            script.setCode(code);
            script.setScriptData(dto.getScriptData());
            script.setTimeCreated(CustomUtils.getCurDateTime(date, "Date"));

            script.setScriptPath(scriptPath);
            script.setDocumentPath(documentPath);
            script.setActive(true);
            if (scriptRepository.save(script) != null) {
                return CustomConstant.CREATE_SCRIPT_SUCCESS;
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
        return CustomConstant.CREATE_SCRIPT_FAIL;
    }

    @Override
    public void downloadScriptTest(int scriptId, HttpServletResponse response) {
        try {
            Optional<Script> script = scriptRepository.findById(scriptId);
            if (script.isPresent()) {
                if (script.get().getScriptPath() != null) {
                    File file = new File(script.get().getScriptPath());
                    String mimeType = "application/octet-stream";
                    response.setContentType(mimeType);
                    response.addHeader("Content-Disposition", "attachment; filename=" + file.getName());
                    response.setContentLength((int) file.length());
                    OutputStream os = null;
                    os = response.getOutputStream();
                    FileManager.downloadZip(file, os);
                }
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public void downloadTemplateQuestionTemplate(int subjectId, HttpServletResponse response) {
        try {
            Optional<Subject> subject = subjectRepository.findById(subjectId);
            if (subject.isPresent()) {
                String subjectCode = subject.get().getCode();
                String templateQuestionTemplateFol = "";
                String extension = "";
                switch (subjectCode) {
                    case CustomConstant.TEMPLATE_TYPE_JAVA:
                        templateQuestionTemplateFol = PathConstants.PATH_TEMPLATE_QUESTION_TEMPLATE_JAVA;
                        extension = CustomConstant.EXTENSION_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                        templateQuestionTemplateFol = PathConstants.PATH_TEMPLATE_QUESTION_TEMPLATE_JAVA_WEB;
                        extension = CustomConstant.EXTENSION_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_CSHARP:
                        templateQuestionTemplateFol = PathConstants.PATH_TEMPLATE_QUESTION_TEMPLATE_C_SHARP;
                        extension = CustomConstant.EXTENSION_CSHARP;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_C:
                        templateQuestionTemplateFol = PathConstants.PATH_TEMPLATE_QUESTION_TEMPLATE_C;
                        extension = CustomConstant.EXTENSION_C;
                        break;
                }
                downloadFile(templateQuestionTemplateFol, CustomConstant.TEMPLATE_QUESTION_TEMPLATE_NAME, extension, response);
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public void downloadTestDocument(int scriptId, HttpServletResponse response) {
        try {
            Optional<Script> script = scriptRepository.findById(scriptId);
            if (script.isPresent()) {
                if (script.get().getDocumentPath() != null) {
                    File file = new File(script.get().getDocumentPath());
                    String mimeType = "application/octet-stream";
                    response.setContentType(mimeType);
                    response.addHeader("Content-Disposition", "attachment; filename=" + file.getName());
                    response.setContentLength((int) file.length());
                    OutputStream os = null;
                    os = response.getOutputStream();
                    FileManager.downloadZip(file, os);
                }
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public void downloadTemplateQuestion(int scriptId, HttpServletResponse response) {
        try {
            Optional<Script> script = scriptRepository.findById(scriptId);
            if (script.isPresent()) {
                String subjectCode = script.get().getSubject().getCode();
                String templateQuestionFol = "";
                String extension = "";
                switch (subjectCode) {
                    case CustomConstant.TEMPLATE_TYPE_JAVA:
                        templateQuestionFol = PathConstants.PATH_TEMPLATE_QUESTION_JAVA;
                        extension = CustomConstant.EXTENSION_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                        templateQuestionFol = PathConstants.PATH_TEMPLATE_QUESTION_JAVA_WEB;
                        extension = CustomConstant.EXTENSION_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_CSHARP:
                        templateQuestionFol = PathConstants.PATH_TEMPLATE_QUESTION_C_SHARP;
                        extension = CustomConstant.EXTENSION_CSHARP;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_C:
                        templateQuestionFol = PathConstants.PATH_TEMPLATE_QUESTION_C;
                        extension = CustomConstant.EXTENSION_C;
                        break;
                }
                downloadFile(templateQuestionFol, script.get().getCode(), extension, response);
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public void downloadDatabaseScript(int scriptId, HttpServletResponse response) {
        try {
            Optional<Script> script = scriptRepository.findById(scriptId);
            if (script.isPresent()) {
                String subjectCode = script.get().getSubject().getCode();
                String databaseFol = "";
                String extension = CustomConstant.EXTENSION_SQL_SERVER;
                switch (subjectCode) {
                    case CustomConstant.TEMPLATE_TYPE_JAVA:
                        databaseFol = PathConstants.PATH_DATABASE_SCRIPT_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                        databaseFol = PathConstants.PATH_DATABASE_SCRIPT_JAVA_WEB;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_CSHARP:
                        databaseFol = PathConstants.PATH_DATABASE_SCRIPT_C_SHARP;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_C:
                        databaseFol = PathConstants.PATH_DATABASE_SCRIPT_C;
                        break;
                }
                downloadFile(databaseFol, script.get().getCode(), extension, response);
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public void downloadTestData(int scriptId, HttpServletResponse response) {
        try {
            Optional<Script> script = scriptRepository.findById(scriptId);
            if (script.isPresent()) {
                String subjectCode = script.get().getSubject().getCode();
                String testDataFol = "";
                String extension = CustomConstant.EXTENSION_TEXT_FILE;
                switch (subjectCode) {
                    case CustomConstant.TEMPLATE_TYPE_JAVA:
                        testDataFol = PathConstants.PATH_TESTDATA_JAVA;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                        testDataFol = PathConstants.PATH_TESTDATA_JAVA_WEB;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_CSHARP:
                        testDataFol = PathConstants.PATH_TESTDATA_C_SHARP;
                        break;
                    case CustomConstant.TEMPLATE_TYPE_C:
                        testDataFol = PathConstants.PATH_TESTDATA_C;
                        break;
                }
                downloadFile(testDataFol, script.get().getCode(), extension, response);
            }
        } catch (FileNotFoundException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        } catch (IOException e) {
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    private void downloadFile(String folderPath, String code, String extension, HttpServletResponse response) throws IOException {
        if (!"".equals(folderPath)) {
            File file = new File(folderPath + code + extension);
            String mimeType = "application/octet-stream";
            response.setContentType(mimeType);
            response.addHeader("Content-Disposition", "attachment; filename=" + file.getName());
            response.setContentLength((int) file.length());
            OutputStream os = null;
            os = response.getOutputStream();
            FileManager.downloadZip(file, os);
        }
    }

    @Override
    public String deleteScript(Integer scriptId) {
        Script script = scriptRepository.findById(scriptId).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Not found script with id" + scriptId));
        script.setActive(false);
        if (scriptRepository.save(script) != null) {
            return CustomConstant.DELETE_SCRIPT_SUCCESS;
        }
        return CustomConstant.DELETE_SCRIPT_FAIL;
    }

    @Override
    public String updateScriptTest(ScriptRequestDto dto) {
        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Not found subject with id" + dto.getSubjectId()));

        try {
            if (dto == null) throw new CustomException(HttpStatus.NOT_FOUND, CustomMessages.MSG_SCRIPT_NULL);
            String templatePath = "";
            String fileExtension = "";
            String templateQuestionFolPath = "";
            String databaseFolPath = "";
            String testDataFolPath = "";
            boolean isAddStatic = false;
            String docsFolPath = "";
            // Select path to create and save script test by type
            switch (subject.getCode()) {
                case CustomConstant.TEMPLATE_TYPE_JAVA:
                    templatePath = PathConstants.PATH_TEMPLATE_JAVA;
                    fileExtension = EXTENSION_JAVA;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_JAVA;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_JAVA;
                    testDataFolPath = PathConstants.PATH_TESTDATA_JAVA;
                    docsFolPath = PathConstants.PATH_DOCS_JAVA;
                    isAddStatic = true;
                    break;
                case CustomConstant.TEMPLATE_TYPE_JAVA_WEB:
                    templatePath = PathConstants.PATH_TEMPLATE_JAVA_WEB;
                    fileExtension = EXTENSION_JAVA;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_JAVA_WEB;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_JAVA_WEB;
                    testDataFolPath = PathConstants.PATH_TESTDATA_JAVA_WEB;
                    docsFolPath = PathConstants.PATH_DOCS_JAVA_WEB;
                    isAddStatic = true;
                    break;
                case CustomConstant.TEMPLATE_TYPE_CSHARP:
                    templatePath = PathConstants.PATH_TEMPLATE_CSHARP;
                    fileExtension = EXTENSION_CSharp;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_C_SHARP;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_C_SHARP;
                    testDataFolPath = PathConstants.PATH_TESTDATA_C_SHARP;
                    docsFolPath = PathConstants.PATH_DOCS_CSHARP;
                    break;
                case CustomConstant.TEMPLATE_TYPE_C:
                    templatePath = PathConstants.PATH_TEMPLATE_C;
                    fileExtension = EXTENSION_C;
                    templateQuestionFolPath = PathConstants.PATH_TEMPLATE_QUESTION_C;
                    databaseFolPath = PathConstants.PATH_DATABASE_SCRIPT_C;
                    testDataFolPath = PathConstants.PATH_TESTDATA_C;
                    docsFolPath = PathConstants.PATH_DOCS_C;
                    break;
                default:
                    throw new CustomException(HttpStatus.CONFLICT, "TypeConflictNotSupported");
            }

            // Get template path
            Resource resource = new ClassPathResource(templatePath);
            if (resource == null) throw new CustomException(HttpStatus.NOT_FOUND, "TemplateNotFound");
            InputStream inputStream = resource.getInputStream();
            byte[] bData = FileCopyUtils.copyToByteArray(inputStream);
            String data = new String(bData, StandardCharsets.UTF_8);

            ObjectMapper mapper = new ObjectMapper();
            // [{"testcase":"testcase1", "code":"ABC"}, {"testcase":"testcase2", "code":"AB2C"}]
            String middlePart = "";
            List<CodeDto> codeDtoList = Arrays.asList(mapper.readValue(dto.getQuestions(), CodeDto[].class));
            if (codeDtoList != null && codeDtoList.size() > 0) {
                for (CodeDto code : codeDtoList) {
                    middlePart += code.getCode().replace(QUESTION_POINT_STR_VALUE, "\"");
                }
            }
            int startIndex = data.indexOf(PREFIX_START);
            String startPart = data.substring(0, startIndex) + PREFIX_START;
            int endIndex = data.indexOf(PREFIX_END);

            String endPart = data.substring(endIndex, data.length());
            String tempScript = startPart + "\n" + middlePart + "\n" + endPart;
            String fullScript = tempScript.replace(QUESTION_POINT_STR_VALUE, dto.getQuestionPointStr());
            if(isAddStatic && !"".equals(dto.getGlobalVariable())){
                String[] variables = dto.getGlobalVariable().split(";");
                String newVariabes = "";
                for (String item: variables) {
                    if(item != null && !"".equals(item)){
                        newVariabes += STATIC_STR + item +";"+ "\n";
                    }
                }
                fullScript = fullScript.replace(GLOBAL_VARIABLE_STR, newVariabes);
            }else {
                fullScript = fullScript.replace(GLOBAL_VARIABLE_STR, dto.getGlobalVariable());
            }
            Script script = scriptRepository.findById(dto.getId()).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "Not found script" + dto.getHeadLecturerId()));
            // Write new file to Scripts_[Language] folder
            String scriptPath = script.getScriptPath();
            BufferedWriter writer = new BufferedWriter(
                    new FileWriter(scriptPath,
                            false));
            writer.write(fullScript);
            writer.close();
            inputStream.close();
            // Copy docs file to Docs_[Language] folder
            String documentPath = "";
            String documentExtesion = CustomConstant.EXTENSION_DOCUMENT;
            MultipartFile docsFile = dto.getDocsFile();
            if (docsFile != null) {
                documentPath = docsFolPath + script.getCode() + documentExtesion;
                Path copyLocation = Paths.get(documentPath);
                Files.copy(docsFile.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            String scriptCode = script.getCode();
            // SAVE CONNECTION STRING in saveFiles()
            saveFilesAndConnectionString(dto, templateQuestionFolPath, databaseFolPath, testDataFolPath,
                    scriptCode, fileExtension);
            // Save to database
            script.setName(dto.getName());
            script.setScriptPath(scriptPath);
            script.setScriptData(dto.getScriptData());
            if (!documentPath.equals("")) {
                script.setDocumentPath(documentPath);
            }
            if (scriptRepository.save(script) != null) {
                return CustomConstant.UPDATE_SCRIPT_SUCCESS;
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
        return CustomConstant.UPDATE_SCRIPT_FAIL;
    }

    private void saveFilesAndConnectionString(ScriptRequestDto dto, String templateQuestionFolPath,
                                              String databaseFolPath, String testDataFolPath,
                                              String scriptCode, String fileExtension) {
        try {
            // Save template question to Template question folder
            MultipartFile templateQuestion = dto.getTemplateQuestion();
            if (templateQuestion != null) {
                Path copyLocation = Paths.get(templateQuestionFolPath + scriptCode + fileExtension);
                Files.copy(templateQuestion.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            // Save database script to database folder
            MultipartFile database = dto.getDatabase();
            if (database != null) {
                Path copyLocation = Paths.get(databaseFolPath + scriptCode + CustomConstant.EXTENSION_SQL_SERVER);
                Files.copy(database.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            // Save file text to folder
            MultipartFile testData = dto.getTestData();
            if (testData != null) {
                Path copyLocation = Paths.get(testDataFolPath + scriptCode + CustomConstant.EXTENSION_TEXT_FILE);
                Files.copy(testData.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            // Get template of DBTemplatet
            String onlineDBUtilities = PATH_DB_TEMPLATE + File.separator + "DBTemplate" + fileExtension;

            Path dbTemplatePath = Paths.get(onlineDBUtilities);
            if (dbTemplatePath == null) {
                return;
            }
            String onlineConnection = dto.getOnlineConnection();

            if (onlineConnection != null && !"".equals(onlineConnection)) {
                ConnectionObj onlineObj = gson.fromJson(onlineConnection, ConnectionObj.class);
                //==================================== SAVE ONLINE CONNECTION STRING HERE ===========================


                Path pathDBTools = Paths.get(PATH_DB_TOOLS + File.separator + scriptCode + "_Online" + fileExtension);
                Files.copy(dbTemplatePath, pathDBTools, StandardCopyOption.REPLACE_EXISTING);
                Map<String, String> map = new HashMap<>();
                map.put("%url%", onlineObj.getUrl());
                map.put("%username%", onlineObj.getUsername());
                map.put("%password%", onlineObj.getPassword());

                FileManager.replaceString(pathDBTools, map);

                //==================================== END SAVE ONLINE CONNECTION STRING HERE ===========================
            }
            String offlineConnection = dto.getOfflineConnection();
            if (offlineConnection != null && !"".equals(offlineConnection)) {
                ConnectionObj offlineObj = gson.fromJson(offlineConnection, ConnectionObj.class);
                //==================================== SAVE OFFLINE CONNECTION STRING HERE ===========================
                Path pathDBTools = Paths.get(PATH_DB_TOOLS + File.separator + scriptCode + "_Offline" + fileExtension);
                Files.copy(dbTemplatePath, pathDBTools, StandardCopyOption.REPLACE_EXISTING);
                Map<String, String> map = new HashMap<>();
                map.put("%url%", offlineObj.getUrl());
                map.put("%username%", offlineObj.getUsername());
                map.put("%password%", offlineObj.getPassword());

                FileManager.replaceString(pathDBTools, map);

                //==================================== END OFFLINE SAVE CONNECTION STRING HERE ===========================
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @Override
    public ScriptResponseDto getScriptTestByScriptId(Integer scriptId) {
        ScriptResponseDto dto = MapperManager.map(scriptRepository.getById(scriptId), ScriptResponseDto.class);
        return dto;
    }


}
