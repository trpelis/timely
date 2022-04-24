package com.example.timely.controllers;

import com.example.timely.dtos.WorkSessionDTO;
import com.example.timely.services.TimelyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/timely")
public class TimelyController {

    private TimelyService timelyService;

    @Autowired
    public TimelyController(TimelyService timelyService) {
        this.timelyService = timelyService;
    }

    @GetMapping("/work-sessions")
    public ResponseEntity<List<WorkSessionDTO>> getWorkSessions(){
        return ResponseEntity.ok(timelyService.getAll());
    }

    @PostMapping("/work-sessions")
    public ResponseEntity<Object> getWorkSessions(@RequestBody WorkSessionDTO dto) throws ValidationException {
        System.out.println(dto.getProjectName());
        System.out.println(dto.getDuration());

        return ResponseEntity.ok(timelyService.create(dto));
    }


}
