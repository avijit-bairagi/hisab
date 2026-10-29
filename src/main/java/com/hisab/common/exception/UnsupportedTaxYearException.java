package com.hisab.common.exception;

public class UnsupportedTaxYearException extends BadRequestException {
    public UnsupportedTaxYearException(String message) {
        super(message);
    }
}
