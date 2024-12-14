package com.example.frontend.controller;

import com.example.frontend.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MainController {
    @Autowired
    private CatalogService catalogService;

    @GetMapping("/")
    public String home(Model model) {
        return "index";
    }

    @GetMapping("/library")
    public String library(Model model) {
        return "library";
    }

    @GetMapping("/radio")
    public String radio(Model model) {
        return "radio";
    }
}
