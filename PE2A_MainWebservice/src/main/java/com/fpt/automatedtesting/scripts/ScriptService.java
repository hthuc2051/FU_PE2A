package com.fpt.automatedtesting.scripts;

import com.fpt.automatedtesting.scripts.dtos.ScriptRequestDto;
import com.fpt.automatedtesting.scripts.dtos.ScriptResponseDto;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface ScriptService {
    List<ScriptResponseDto> getAll();
    List<ScriptResponseDto> getScriptTestBySubjectId(Integer subjectId);
    String generateScriptTest(ScriptRequestDto dto);
    void downloadScriptTest(int scriptId,HttpServletResponse response);
    void downloadTestDocument(int scriptId,HttpServletResponse response);
    void downloadTemplateQuestion(int scriptId,HttpServletResponse response);
    void downloadDatabaseScript(int scriptId,HttpServletResponse response);
    void downloadTestData(int scriptId,HttpServletResponse response);
    void downloadTemplateQuestionTemplate(int subjectId,HttpServletResponse response);
    String deleteScript(Integer scriptId);
    String updateScriptTest(ScriptRequestDto dto);
    ScriptResponseDto getScriptTestByScriptId(Integer scriptId);
}
