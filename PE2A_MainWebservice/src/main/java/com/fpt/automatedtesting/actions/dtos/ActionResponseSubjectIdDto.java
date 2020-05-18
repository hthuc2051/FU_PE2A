package com.fpt.automatedtesting.actions.dtos;

import com.fpt.automatedtesting.parameters.dtos.ParameterResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActionResponseSubjectIdDto {
    private Integer id;
    private String name;
    private String code;
    private List<ParameterResponseDto> params;
    private List<Integer> subjectId;
}
