package com.fpt.automatedtesting.githubresult;

import com.fpt.automatedtesting.duplicatedcode.dtos.DuplicatedCodeRequest;
import com.fpt.automatedtesting.githubresult.dtos.GitHubFileDuplicateDTO;
import com.fpt.automatedtesting.githubresult.dtos.GithubResultDTO;
import com.fpt.automatedtesting.practicalexams.PracticalExam;
import com.fpt.automatedtesting.practicalexams.PracticalExamRepository;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GitHubResultServiceImpl implements GitHubResultService {

    private final GitHubResultRepository githubResultRepository;
    private final PracticalExamRepository practicalExamRepository;
    Gson gson = new Gson();
    @Autowired
    public GitHubResultServiceImpl(GitHubResultRepository githubResultRepository, PracticalExamRepository practicalExamRepository) {
        this.githubResultRepository = githubResultRepository;
        this.practicalExamRepository = practicalExamRepository;
    }


    @Override
    public boolean create(int practicalExamId, String studentCode, Map<String, List<GitHubFileDuplicateDTO>> listDuplicate) {
        String json = gson.toJson(listDuplicate);
        Optional<PracticalExam> practicalExam = practicalExamRepository.findById(practicalExamId);
        if(practicalExam.isPresent()){
            GitHubResult gitHubResultAvailable = githubResultRepository.findByPracticalExamCodeAndStudentCode(practicalExam.get().getCode(),studentCode);
            GitHubResult githubResult = new GitHubResult();
            if(gitHubResultAvailable == null){
                githubResult.setPracticalExam(practicalExam.get());
                githubResult.setStudentCode(studentCode);
                githubResult.setResult(json);
            }else{
                githubResult = gitHubResultAvailable;
                githubResult.setResult(json);
            }
            if (githubResultRepository.save(githubResult) != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public  List<GithubResultDTO> getListByPracticalCodeAndStudentCode(DuplicatedCodeRequest request) {
        ArrayList<GithubResultDTO> listResult = new ArrayList<>();
        Map<String, List<GitHubFileDuplicateDTO>> result = new HashMap<>();
        GitHubResult githubResult = githubResultRepository.findByPracticalExamCodeAndStudentCode(request.getPracticalExamCode(),request.getStudentCode());
        if(githubResult != null){
            String json = githubResult.getResult();
            if(!"".equals(json)){
                result = gson.fromJson(json, new TypeToken<Map<String, List<GitHubFileDuplicateDTO>>>(){}.getType());
                for (Map.Entry<String,List<GitHubFileDuplicateDTO>> entry: result.entrySet()) {
                    GithubResultDTO dto = new GithubResultDTO();
                    dto.setStudentFile(entry.getKey());
                    dto.setListFile(entry.getValue());
                    listResult.add(dto);
                }
            }
        }


        return listResult;
    }
}
