package com.example.timely.services;


import com.example.timely.dtos.WorkSessionDTO;
import com.example.timely.models.WorkSession;
import com.example.timely.repositories.WorkSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimelyService {

    private WorkSessionRepository workSessionRepo;

    @Autowired
    public TimelyService(WorkSessionRepository workSessionRepo) {
        this.workSessionRepo = workSessionRepo;
    }
    //get sessions from DB
    public List<WorkSessionDTO> getAll(){
        return workSessionRepo.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    //create WorkSession object
    public WorkSession create(WorkSessionDTO dto) throws ValidationException {
        WorkSession workSession = WorkSession.builder()
                .projectName(dto.getProjectName())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .duration(dto.getDuration()).build();

        try {
            workSession = workSessionRepo.save(workSession);
        }
        catch (Exception e){
            throw new ValidationException(e.getMessage());
        }

        return workSession;
    }
    private WorkSessionDTO mapToDto(WorkSession workSession){
        return new WorkSessionDTO(workSession.getProjectName(), workSession.getStartTime(), workSession.getEndTime(),
                workSession.getDuration());
    }
}
